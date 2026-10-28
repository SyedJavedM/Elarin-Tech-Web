import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { certificateRevokeSchema } from "@/lib/validation";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const admin = await requireRole("ADMIN");
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const parsed = certificateRevokeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Provide a revocation reason of at least 10 characters." }, { status: 400 });
  try {
    await db.$transaction(async (tx) => {
      const updated = await tx.certificate.updateMany({ where: { id, status: "ISSUED" }, data: { status: "REVOKED", revokedAt: new Date(), revocationReason: parsed.data.reason } });
      if (updated.count !== 1) throw new Error("Certificate was not issued or is already revoked.");
      await tx.adminAuditLog.create({ data: { adminId: admin.id, action: "CERTIFICATE_REVOKED", entityType: "Certificate", entityId: id, metadata: { reason: parsed.data.reason } } });
    });
    return NextResponse.json({ ok: true, status: "REVOKED" });
  } catch {
    return NextResponse.json({ error: "Certificate could not be updated. It may already be revoked." }, { status: 409 });
  }
}