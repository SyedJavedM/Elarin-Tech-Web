import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
export const dynamic="force-dynamic";
export default async function UsersAdmin(){const user=await requireRole("ADMIN");if(!user)redirect("/login");const items=await db.user.findMany({select:{id:true,name:true,email:true,role:true,createdAt:true},orderBy:{createdAt:"desc"},take:100});return <main className="shell"><header className="page-hero"><p className="eyebrow">Admin / Accounts</p><h1>Accounts</h1><p>Recent learner and organization accounts.</p></header><section className="section" style={{paddingTop:0}}>{items.map(x=><article className="program-card" key={x.id}><p className="eyebrow">{x.role} · {x.createdAt.toLocaleDateString()}</p><h2>{x.name}</h2><p>{x.email}</p></article>)}</section></main>}
