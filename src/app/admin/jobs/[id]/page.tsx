import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import JobForm from "../JobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return notFound();

  const [job] = await db
    .select()
    .from(schema.jobs)
    .where(eq(schema.jobs.id, numericId))
    .limit(1);

  if (!job) return notFound();

  return (
    <div className="p-8">
      <AdminPageHeader title="Edit Job" description={`Editing: ${job.title}`} />
      <JobForm job={job} />
    </div>
  );
}
