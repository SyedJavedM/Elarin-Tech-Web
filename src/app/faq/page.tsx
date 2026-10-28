import { db } from "@/lib/prisma";
import { internshipDurationFaq } from "@/lib/internships";
export const dynamic = "force-dynamic";
export const metadata = { title: "FAQs", description: "Answers to common questions about learning programs and services." };
export default async function FAQPage() {
  const items = await db.fAQ.findMany({ where: { published: true }, orderBy: [{ category: "asc" }, { order: "asc" }] }).catch(() => []);
  const questions = items.some((item) => item.question === internshipDurationFaq.question)
    ? items
    : [...items, { id: "internship-duration", category: "Internship programs", question: internshipDurationFaq.question, answer: internshipDurationFaq.answer, published: true, order: 1 }];
  return <div className="shell"><header className="page-hero"><p className="eyebrow">Resources</p><h1>Frequently asked questions.</h1></header><section className="section" style={{ paddingTop: 0, maxWidth: 850 }}>{questions.length ? questions.map((item) => <details key={item.id} className="pillar-card" style={{ minHeight: 0, marginBottom: 12 }}><summary style={{ fontWeight: 700, cursor: "pointer" }}>{item.question}</summary><p>{item.answer}</p></details>) : <div className="empty-state">Questions and answers will appear here as the catalog is published.</div>}</section></div>;
}
