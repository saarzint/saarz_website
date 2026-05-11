import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="p-8">
      <AdminPageHeader
        title="New Testimonial"
        description="Add a new client testimonial"
      />
      <TestimonialForm />
    </div>
  );
}
