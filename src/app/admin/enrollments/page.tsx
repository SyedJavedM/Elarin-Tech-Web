import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { AdminRecords } from "@/components/admin-records";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (!await requireRole("ADMIN")) redirect("/login");
  const records = await db.courseEnrollment.findMany({ include: { user: { select: { name: true, email: true } }, program: { select: { title: true } } }, orderBy: { enrolledAt: "desc" }, take: 500 });
  return <AdminRecords title="Course enrolments" description="Learner, course, enrolment status and recorded progress. Recent 500 records maximum." rows={records.map(x => ({ id: x.id, Learner: x.user.name, Email: x.user.email, Course: x.program.title, Status: x.status, Progress: x.progress + "%", Enrolled: x.enrolledAt.toLocaleDateString() }))} columns={["Learner", "Email", "Course", "Status", "Progress", "Enrolled"]} />;
}
