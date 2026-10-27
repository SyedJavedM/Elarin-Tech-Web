import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { z } from "zod";
const schema=z.object({status:z.enum(["NEW","CONTACTED","QUALIFIED","PROPOSAL","NEGOTIATION","WON","LOST"])});
export async function PATCH(request:Request,context:{params:Promise<{id:string}>}){const admin=await requireRole("ADMIN");if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});const{id}=await context.params;const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid status"},{status:400});const inquiry=await db.inquiry.update({where:{id},data:{status:parsed.data.status}});await db.adminAuditLog.create({data:{adminId:admin.id,action:"INQUIRY_STATUS_UPDATED",entityType:"Inquiry",entityId:id,metadata:{status:parsed.data.status}}});return NextResponse.json({inquiry});}
