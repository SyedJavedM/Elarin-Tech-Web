import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { InquiryStatus } from "@/components/inquiry-status";
export const dynamic="force-dynamic";
export default async function InquiriesAdmin(){const user=await requireRole("ADMIN");if(!user)redirect("/login");const items=await db.inquiry.findMany({orderBy:{createdAt:"desc"},take:500});return <main className="shell"><header className="page-hero"><p className="eyebrow">Admin / Inbox</p><h1>Enquiries</h1><p>Submitted project, education, and contact requests.</p></header><section className="section" style={{paddingTop:0}}>{items.length?items.map(x=><article className="program-card" key={x.id}><p className="eyebrow">{x.kind} · {x.status} · {x.createdAt.toLocaleString()}</p><h2>{x.subject||x.name}</h2><p>{x.name} · {x.email}{x.organization?` · ${x.organization}`:""}</p><p>{x.message}</p><InquiryStatus id={x.id} initial={x.status}/></article>):<p className="empty-state">No enquiries received.</p>}</section></main>}
