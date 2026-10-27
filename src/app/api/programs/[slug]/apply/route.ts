import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { applicationSchema } from "@/lib/validation";
export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const program = await db.program.findFirst({ where: { slug, status: "PUBLISHED", kind: "INTERNSHIP" } });
  if (!program) return NextResponse.json({ error: "This opportunity is not accepting applications." }, { status: 404 });
  const parsed = applicationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  const user = await currentUser();
  const application = await db.internshipApplication.create({ data: { ...parsed.data, userId: user?.id ?? null, programId: program.id } });
  return NextResponse.json({ ok: true, id: application.id }, { status: 201 });
}
