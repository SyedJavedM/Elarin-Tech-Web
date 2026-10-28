import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validation";
export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const parsed = registrationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please enter a valid name and email." }, { status: 400 });
  try {
    const program = await db.program.findFirst({ where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() }, kind: { in: ["WORKSHOP", "WEBINAR"] } } });
    if (!program) return NextResponse.json({ error: "This event is not open for registration." }, { status: 404 });
    const matchingUser = await db.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
    if (program.kind === "WORKSHOP") {
      const existing = await db.workshopRegistration.findUnique({ where: { programId_email: { programId: program.id, email: parsed.data.email } } });
      if (existing) return NextResponse.json({ error: "That email is already registered for this event." }, { status: 409 });
      await db.workshopRegistration.create({ data: { programId: program.id, userId: matchingUser?.id ?? null, fullName: parsed.data.fullName, email: parsed.data.email } });
    } else {
      const existing = await db.webinarRegistration.findUnique({ where: { programId_email: { programId: program.id, email: parsed.data.email } } });
      if (existing) return NextResponse.json({ error: "That email is already registered for this event." }, { status: 409 });
      await db.webinarRegistration.create({ data: { programId: program.id, userId: matchingUser?.id ?? null, fullName: parsed.data.fullName, email: parsed.data.email } });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Registration could not be saved right now. Please try again later." }, { status: 503 });
  }
}
