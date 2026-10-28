import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { certificateIssueSchema } from "@/lib/validation";
import { nextRecordReference } from "@/lib/reference-codes";
class CompletionRequirementError extends Error {}
export async function GET() {
  if (!await requireRole("ADMIN")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const certificates = await db.certificate.findMany({ include: { program: { select: { title: true } }, user: { select: { name: true, email: true } }, _count: { select: { verifications: true } }, verifications: { orderBy: { verifiedAt: "desc" }, take: 5, select: { verifiedAt: true } } }, orderBy: { issuedAt: "desc" }, take: 200 });
  return NextResponse.json({ certificates });
}
export async function POST(request: Request) {
  const admin = await requireRole("ADMIN");
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = certificateIssueSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose a learner and program, provide completion evidence, and confirm the completion review." }, { status: 400 });
  try {
    const issued = await db.$transaction(async (tx) => {
      const [user, program] = await Promise.all([
        tx.user.findUnique({ where: { id: parsed.data.userId }, select: { id: true, name: true, role: true } }),
        tx.program.findUnique({ where: { id: parsed.data.programId }, select: { id: true, title: true, kind: true } }),
      ]);
      if (!user || user.role !== "STUDENT" || !program) throw new CompletionRequirementError("Choose a valid learner and program.");
      let enrollmentId: string | undefined;
      if (program.kind === "INTERNSHIP") {
        const acceptedApplication = await tx.internshipApplication.findFirst({ where: { programId: program.id, userId: user.id, status: "ACCEPTED" }, select: { id: true } });
        if (!acceptedApplication) throw new CompletionRequirementError("An accepted internship application is required before completion can be recorded.");
      } else if (program.kind === "COURSE" || program.kind === "CERTIFICATION") {
        const enrollment = await tx.courseEnrollment.findUnique({ where: { userId_programId: { userId: user.id, programId: program.id } }, select: { id: true } });
        if (!enrollment) throw new CompletionRequirementError("The learner must be enrolled before completion can be recorded.");
        await tx.courseEnrollment.update({ where: { id: enrollment.id }, data: { progress: 100, completedAt: new Date(), status: "COMPLETED" } });
        enrollmentId = enrollment.id;
      } else if (program.kind === "WORKSHOP") {
        const attended = await tx.workshopRegistration.findFirst({ where: { programId: program.id, userId: user.id, status: "ATTENDED" }, select: { id: true } });
        if (!attended) throw new CompletionRequirementError("An attended workshop registration is required.");
      } else if (program.kind === "WEBINAR") {
        const attended = await tx.webinarRegistration.findFirst({ where: { programId: program.id, userId: user.id, status: "ATTENDED" }, select: { id: true } });
        if (!attended) throw new CompletionRequirementError("An attended webinar registration is required.");
      }
      else if (program.kind === "BOOTCAMP") throw new CompletionRequirementError("A recorded bootcamp completion workflow is not configured yet.");
      const completion = await tx.completionRecord.create({ data: { userId: user.id, programId: program.id, enrollmentId, recordedByAdminId: admin.id, completionCriteria: parsed.data.completionCriteria } });
      const certificate = await tx.certificate.create({ data: { certificateId: await nextRecordReference(tx, "CERT"), userId: user.id, programId: program.id, recipientName: user.name, programTitle: program.title, completionRecordId: completion.id } });
      await tx.adminAuditLog.create({ data: { adminId: admin.id, action: "CERTIFICATE_ISSUED", entityType: "Certificate", entityId: certificate.id, metadata: { certificateId: certificate.certificateId, programTitle: program.title, completionRecordId: completion.id } } });
      return certificate;
    });
    return NextResponse.json({ ok: true, certificateId: issued.certificateId, verifyUrl: `/verify-certificate?id=${encodeURIComponent(issued.certificateId)}` }, { status: 201 });
  } catch (error) {
    if (error instanceof CompletionRequirementError) return NextResponse.json({ error: error.message }, { status: 409 });
    return NextResponse.json({ error: "Certificate could not be issued. A completion record or certificate may already exist for this learner and program." }, { status: 409 });
  }
}