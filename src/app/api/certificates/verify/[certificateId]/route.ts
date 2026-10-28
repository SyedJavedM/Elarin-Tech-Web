import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { brand } from "@/lib/brand";
const certificateIdSchema = z.string().trim().min(1).max(64).transform((value) => value.toUpperCase()).pipe(z.string().regex(/^EL[RT]-[A-Z0-9-]{3,60}$/));
export async function GET(request: Request, context: { params: Promise<{ certificateId: string }> }) {
  const { certificateId: rawId } = await context.params;
  const parsed = certificateIdSchema.safeParse(rawId);
  if (!parsed.success) return NextResponse.json({ valid: false, status: "INVALID_INPUT", error: "Enter a valid certificate ID." }, { status: 400, headers: { "cache-control": "no-store" } });
  try {
    const certificate = await db.certificate.findUnique({
      where: { certificateId: parsed.data },
      select: { id: true, certificateId: true, recipientName: true, programTitle: true, status: true, issuedAt: true, revokedAt: true, program: { select: { kind: true, duration: true } }, completionRecord: { select: { completedAt: true } } },
    });
    if (!certificate) return NextResponse.json({ valid: false, status: "NOT_FOUND", error: "No issued certificate matches that ID." }, { status: 404, headers: { "cache-control": "no-store" } });
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const requesterHash = createHash("sha256").update(forwarded).digest("hex");
    await db.certificateVerification.create({ data: { certificateId: certificate.id, requesterHash } });
    return NextResponse.json({
      valid: certificate.status === "ISSUED",
      status: certificate.status,
      recipientName: certificate.recipientName,
      programTitle: certificate.programTitle,
      certificateId: certificate.certificateId,
      certificateType: certificate.program?.kind ?? "PROGRAM CERTIFICATE",
      duration: certificate.program?.duration ?? null,
      completionStatus: certificate.completionRecord ? "COMPLETED" : "LEGACY RECORD",
      issuedAt: certificate.issuedAt.toISOString(),
      revokedAt: certificate.revokedAt?.toISOString() ?? null,
      issuingOrganisation: brand.name,
    });
  } catch {
    return NextResponse.json({ error: "Certificate verification is temporarily unavailable." }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}