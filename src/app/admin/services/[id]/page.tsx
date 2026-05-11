import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ServiceForm from "../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [service] = await db
    .select()
    .from(schema.services)
    .where(eq(schema.services.id, id))
    .limit(1);

  if (!service) return notFound();

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Edit Service"
        description={`Editing: ${service.title}`}
      />
      <ServiceForm service={service} />
    </div>
  );
}
