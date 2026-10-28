import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { AdminRecords } from "@/components/admin-records";
export const dynamic="force-dynamic";
export default async function Page(){if(!await requireRole("ADMIN"))redirect("/login");const d=await db.user.findMany({where:{role:"STUDENT"},select:{id:true,name:true,email:true,createdAt:true,studentProfile:{select:{institution:true,education:true}}},orderBy:{createdAt:"desc"},take:500});return <AdminRecords title="Student accounts" description="Learner accounts and supplied education profile details. Password hashes and session data are never shown." rows={d.map(x=>({id:x.id,Name:x.name,Email:x.email,Institution:x.studentProfile?.institution||null,Education:x.studentProfile?.education||null,Registered:x.createdAt.toLocaleDateString()}))} columns={["Name","Email","Institution","Education","Registered"]} exportType="students"/>}
