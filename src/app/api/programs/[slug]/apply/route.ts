import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { applicationSchema } from "@/lib/validation";
export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const parsed = applicationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  try {
    const program = await db.program.findFirst({ where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() }, kind: "INTERNSHIP" } });
    if (!program) return NextResponse.json({ error: "This opportunity is not accepting applications." }, { status: 404 });
    const duplicate = await db.internshipApplication.findFirst({ where: { programId: program.id, email: parsed.data.email } });
    if (duplicate) return NextResponse.json({ error: "An application for this internship already exists for that email." }, { status: 409 });
    const sessionUser = await currentUser().catch(() => null);
    const matchingUser = sessionUser?.email === parsed.data.email ? sessionUser : await db.user.findUnique({ where: { email: parsed.data.email } });
    const application = await db.internshipApplication.create({ data: { ...parsed.data, userId: matchingUser?.id ?? null, programId: program.id } });
    return NextResponse.json({ ok: true, id: application.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Your application could not be saved right now. Please try again later." }, { status: 503 });
  }
}
