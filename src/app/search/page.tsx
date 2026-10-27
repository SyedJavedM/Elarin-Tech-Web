import Link from "next/link";
import { db } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const metadata = { title: "Search" };
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
 const { q = "" } = await searchParams; const query = q.trim().slice(0, 100);
 const items = query ? await db.program.findMany({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() }, OR: [{ title: { contains: query, mode: "insensitive" } }, { summary: { contains: query, mode: "insensitive" } }] }, take: 30 }).catch(() => []) : [];
 return <main className="shell"><header className="page-hero"><p className="eyebrow">Find your next step</p><h1>Search programs.</h1><form action="/search" className="search-form"><input name="q" defaultValue={query} placeholder="Try data science or web development" aria-label="Search programs"/><button className="button">Search</button></form></header><section className="section" style={{paddingTop:0}}>{query ? items.length ? items.map(x=><article className="program-card" key={x.id}><p className="eyebrow">{x.kind.toLowerCase()}</p><h2><Link href={`/${({ INTERNSHIP:"internships", COURSE:"courses", WORKSHOP:"workshops", WEBINAR:"webinars", BOOTCAMP:"bootcamps", CERTIFICATION:"certifications" } as const)[x.kind]}/${x.slug}`}>{x.title}</Link></h2><p>{x.summary}</p></article>) : <p className="empty-state">No published programs match “{query}”.</p> : <p>Search the published learning catalog.</p>}</section></main>
}


