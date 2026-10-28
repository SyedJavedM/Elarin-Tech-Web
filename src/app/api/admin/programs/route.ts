import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { nextProgramReference } from "@/lib/reference-codes";
import { programSchema } from "@/lib/validation";
export async function GET() {
  if (!await requireRole("ADMIN")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const programs = await db.program.findMany({ orderBy: { updatedAt: "desc" }, take: 100 });
  return NextResponse.json({ programs });
}
export async function POST(request: Request) {
  const admin = await requireRole("ADMIN");
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = programSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid program data", details: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;
  try {
    const program = await db.$transaction(async (tx) => {
      const referenceCode = await nextProgramReference(tx, data.kind, data.slug);
      return tx.program.create({ data: { ...data, referenceCode, publishedAt: data.status === "PUBLISHED" ? new Date() : null } });
    });
    await db.adminAuditLog.create({ data: { adminId: admin.id, action: "PROGRAM_CREATED", entityType: "Program", entityId: program.id, metadata: { referenceCode: program.referenceCode } } });
    return NextResponse.json({ program }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The program could not be created. Check for an existing slug." }, { status: 409 });
  }
}