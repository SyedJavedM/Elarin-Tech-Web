import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { nextRecordReference } from "@/lib/reference-codes";
export async function POST(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in to enroll." }, { status: 401 });
  const { slug } = await context.params;
  const program = await db.program.findFirst({ where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() }, kind: { in: ["COURSE", "CERTIFICATION"] } } });
  if (!program) return NextResponse.json({ error: "Program not found." }, { status: 404 });
  if (program.pricePaise > 0) return NextResponse.json({ error: "Secure checkout is not configured yet. Contact us for enrollment." }, { status: 501 });
  try {
    const existing = await db.courseEnrollment.findUnique({ where: { userId_programId: { userId: user.id, programId: program.id } } });
    if (existing) return NextResponse.json({ ok: true, referenceCode: existing.referenceCode }, { status: 200 });
    const enrollment = await db.$transaction(async (tx) => tx.courseEnrollment.create({ data: { userId: user.id, programId: program.id, referenceCode: await nextRecordReference(tx, "ENR") } }));
    return NextResponse.json({ ok: true, referenceCode: enrollment.referenceCode }, { status: 201 });
  } catch {
    const existing = await db.courseEnrollment.findUnique({ where: { userId_programId: { userId: user.id, programId: program.id } } }).catch(() => null);
    if (existing) return NextResponse.json({ ok: true, referenceCode: existing.referenceCode }, { status: 200 });
    return NextResponse.json({ error: "Enrollment could not be saved. Please try again." }, { status: 503 });
  }
}