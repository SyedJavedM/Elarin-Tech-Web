import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { db } from "@/lib/prisma";
export async function GET(request: Request, context: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await context.params;
  const cert = await db.certificate.findUnique({ where: { certificateId } });
  if (!cert) return NextResponse.json({ valid: false, status: "NOT_FOUND" }, { status: 404 });
  const requesterHash = createHash("sha256").update(request.headers.get("x-forwarded-for") ?? "unknown").digest("hex");
  await db.certificateVerification.create({ data: { certificateId: cert.id, requesterHash } });
  return NextResponse.json({ valid: cert.status === "ISSUED", status: cert.status, recipientName: cert.recipientName, programTitle: cert.programTitle, issuedAt: cert.issuedAt.toISOString() });
}
