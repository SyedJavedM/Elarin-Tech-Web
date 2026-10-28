import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { internships, internshipDurationFaq } from "../src/lib/internships";
import { internshipDetails } from "../src/lib/internship-details";
import { nextProgramReference } from "../src/lib/reference-codes";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("DIRECT_URL or DATABASE_URL is required to seed the internship catalog.");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString, max: 2 }) });

async function main() {
  for (const program of internships) {
    const { curriculum, ...fields } = program;
    const details = internshipDetails[program.slug];
    await db.$transaction(async (tx) => {
      const existing = await tx.program.findUnique({ where: { slug: program.slug }, select: { id: true, referenceCode: true } });
      if (existing) {
        if (!existing.referenceCode) {
          await tx.program.update({ where: { id: existing.id }, data: { referenceCode: await nextProgramReference(tx, "INTERNSHIP", program.slug) } });
        }
        return;
      }
      const referenceCode = await nextProgramReference(tx, "INTERNSHIP", program.slug);
      await tx.program.create({
        data: {
          ...fields,
          curriculum: JSON.parse(JSON.stringify(curriculum)),
          details: JSON.parse(JSON.stringify(details)),
          kind: "INTERNSHIP",
          status: "PUBLISHED",
          publishedAt: new Date(),
          referenceCode,
        },
      });
    });
  }

  const existingFaq = await db.fAQ.findFirst({ where: { question: internshipDurationFaq.question }, select: { id: true } });
  if (!existingFaq) {
    await db.fAQ.create({
      data: {
        category: "Internship programs",
        answer: internshipDurationFaq.answer,
        published: true,
        order: 1,
        question: internshipDurationFaq.question,
      },
    });
  }
  console.log(`Ensured ${internships.length} internship programs and the duration FAQ without overwriting existing catalog content.`);
}

main().finally(() => db.$disconnect());