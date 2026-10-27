import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid name, email, and password (at least 12 characters)." },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;
  try {
    if (await db.user.findUnique({ where: { email } })) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }
    const user = await db.user.create({ data: { name, email, passwordHash: await hash(password, 12) } });
    await createSession(user.id);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Learner registration failed", error);
    return NextResponse.json(
      { error: "We couldn't create your account right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
