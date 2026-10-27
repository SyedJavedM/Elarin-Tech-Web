import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
export async function GET(){if(!await requireRole("ADMIN"))return NextResponse.json({error:"Unauthorized"},{status:401});const inquiries=await db.inquiry.findMany({orderBy:{createdAt:"desc"},take:100});return NextResponse.json({inquiries});}
