import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { inquirySchema, institutionalInquirySchema } from "@/lib/validation";

const kinds = { contact: "CONTACT", project: "PROJECT", institutions: "INSTITUTION", institution: "INSTITUTION", corporate: "CORPORATE", courses: "COURSE" } as const;

export async function POST(request: Request, context: { params: Promise<{ kind: string }> }) {
  const { kind } = await context.params;
  const mapped = kinds[kind as keyof typeof kinds];
  if (!mapped) return NextResponse.json({ error: "Unknown inquiry type." }, { status: 404 });
  const body = await request.json().catch(() => null);

  if (mapped === "INSTITUTION") {
    const parsed = institutionalInquirySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please complete the required institutional enquiry fields." }, { status: 400 });
    const data = parsed.data;
    try {
      const inquiry = await db.inquiry.create({ data: {
        kind: mapped,
        name: data.contactName,
        email: data.officialEmail,
        organization: data.institutionName,
        phone: data.phone,
        subject: `${data.institutionType} · ${data.designation}`,
        message: data.message,
        metadata: { institutionType: data.institutionType, designation: data.designation, location: data.location, areasOfInterest: data.areasOfInterest, approximateStudents: data.approximateStudents || null, preferredDates: data.preferredDates || null, consent: true },
      } });
      return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
    } catch {
      return NextResponse.json({ error: "Your enquiry could not be saved right now. Please try again later." }, { status: 503 });
    }
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  try {
    const inquiry = await db.inquiry.create({ data: { ...parsed.data, kind: mapped } });
    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Your enquiry could not be saved right now. Please try again later." }, { status: 503 });
  }
}
