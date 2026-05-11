import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
  return (
    <div className="p-8">
      <AdminPageHeader
        title="New Service"
        description="Create a new service offering"
      />
      <ServiceForm />
    </div>
  );
}
