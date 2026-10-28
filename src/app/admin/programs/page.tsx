import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
export const dynamic="force-dynamic";
export default async function ProgramsAdmin(){const user=await requireRole("ADMIN");if(!user)redirect("/login");const items=await db.program.findMany({orderBy:{updatedAt:"desc"},take:500});return <main className="shell"><header className="page-hero"><p className="eyebrow">Admin / Programs</p><h1>Program catalog</h1><p>Review current content and publication status.</p></header><section className="section" style={{paddingTop:0}}>{items.length?items.map(x=><article className="program-card" key={x.id}><p className="eyebrow">{x.referenceCode} · {x.kind} · {x.status}</p><h2>{x.title}</h2><p>/{x.slug} · Updated {x.updatedAt.toLocaleDateString()}</p></article>):<p className="empty-state">No programs yet. Create programs through the authenticated admin API.</p>}</section></main>}
