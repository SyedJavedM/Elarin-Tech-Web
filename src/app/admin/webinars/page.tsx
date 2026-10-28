import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { AdminRecords } from "@/components/admin-records";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (!await requireRole("ADMIN")) redirect("/login");
  const records = await db.webinarRegistration.findMany({ include: { program: { select: { title: true } } }, orderBy: { createdAt: "desc" }, take: 500 });
  return <AdminRecords title="Webinar registrations" description="Participants and registration state for webinars. Recent 500 records maximum." rows={records.map(x => ({ id: x.id, Participant: x.fullName, Email: x.email, Webinar: x.program.title, Status: x.status, Registered: x.createdAt.toLocaleDateString() }))} columns={["Participant", "Email", "Webinar", "Status", "Registered"]} />;
}
