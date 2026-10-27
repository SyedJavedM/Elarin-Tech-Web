import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
export async function GET(request: Request) { const q = new URL(request.url).searchParams.get("q")?.trim().slice(0,100) ?? ""; if (!q) return NextResponse.json({ items: [] }); const items = await db.program.findMany({ where: { status:"PUBLISHED", publishedAt:{lte:new Date()}, OR:[{title:{contains:q,mode:"insensitive"}},{summary:{contains:q,mode:"insensitive"}}] }, select:{title:true,slug:true,kind:true,summary:true}, take:20 }); return NextResponse.json({items}); }
