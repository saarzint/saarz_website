import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TestimonialForm from "../TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [testimonial] = await db
    .select()
    .from(schema.testimonials)
    .where(eq(schema.testimonials.id, id))
    .limit(1);

  if (!testimonial) return notFound();

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Edit Testimonial"
        description={`Editing: ${testimonial.name}`}
      />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
