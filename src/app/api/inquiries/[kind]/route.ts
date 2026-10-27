import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validation";
const kinds = { contact: "CONTACT", project: "PROJECT", institutions: "INSTITUTION", corporate: "CORPORATE", courses: "COURSE" } as const;
export async function POST(request: Request, context: { params: Promise<{ kind: string }> }) {
  const { kind } = await context.params;
  const mapped = kinds[kind as keyof typeof kinds];
  if (!mapped) return NextResponse.json({ error: "Unknown inquiry type." }, { status: 404 });
  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  const inquiry = await db.inquiry.create({ data: { ...parsed.data, kind: mapped } });
  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}
