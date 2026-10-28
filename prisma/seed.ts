import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { internships, internshipDurationFaq } from "../src/lib/internships";
import { internshipDetails } from "../src/lib/internship-details";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("DIRECT_URL or DATABASE_URL is required to seed the internship catalog.");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString, max: 2 }) });

async function main() {
  for (const program of internships) {
    const { curriculum, ...fields } = program;
    const details = internshipDetails[program.slug];
    await db.program.upsert({
      where: { slug: program.slug },
      create: { ...fields, curriculum: JSON.parse(JSON.stringify(curriculum)), details: JSON.parse(JSON.stringify(details)), kind: "INTERNSHIP", status: "PUBLISHED", publishedAt: new Date() },
      update: { ...fields, curriculum: JSON.parse(JSON.stringify(curriculum)), details: JSON.parse(JSON.stringify(details)), kind: "INTERNSHIP", status: "PUBLISHED" },
    });
  }
  const existingFaq = await db.fAQ.findFirst({ where: { question: internshipDurationFaq.question } });
  const faq = { category: "Internship programs", answer: internshipDurationFaq.answer, published: true, order: 1 };
  if (existingFaq) await db.fAQ.update({ where: { id: existingFaq.id }, data: faq });
  else await db.fAQ.create({ data: { ...faq, question: internshipDurationFaq.question } });
  console.log(`Seeded ${internships.length} internship programs and the duration FAQ.`);
}

main().finally(() => db.$disconnect());
