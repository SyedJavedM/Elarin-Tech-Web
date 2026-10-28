import type { Prisma } from "@/generated/prisma/client";

type CounterClient = Pick<Prisma.TransactionClient, "referenceCounter">;

async function nextValue(tx: CounterClient, key: string) {
  const counter = await tx.referenceCounter.upsert({
    where: { key },
    create: { key, value: 1 },
    update: { value: { increment: 1 } },
    select: { value: true },
  });
  return counter.value;
}

const pad = (value: number, width: number) => String(value).padStart(width, "0");

export async function nextRecordReference(tx: CounterClient, kind: "APP" | "ENR" | "CERT", at = new Date()) {
  const year = at.getUTCFullYear();
  const value = await nextValue(tx, `${kind}:${year}`);
  return `ELR-${kind}-${year}-${pad(value, 4)}`;
}

export async function nextProgramReference(tx: CounterClient, kind: string, slug: string) {
  const token = slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 12) || "PROGRAM";
  const category = kind === "INTERNSHIP" ? "INT" : kind === "COURSE" ? "CRS" : kind === "CERTIFICATION" ? "CRT" : kind === "WORKSHOP" ? "WSH" : kind === "WEBINAR" ? "WEB" : "BOT";
  const value = await nextValue(tx, `PROGRAM:${kind}:${token}`);
  return `ELR-${category}-${token}-${pad(value, 3)}`;
}
