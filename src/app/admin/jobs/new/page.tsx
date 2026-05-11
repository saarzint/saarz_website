import AdminPageHeader from "@/components/admin/AdminPageHeader";
import JobForm from "../JobForm";

export default function NewJobPage() {
  return (
    <div className="p-8">
      <AdminPageHeader title="New Job" description="Post a new open position" />
      <JobForm />
    </div>
  );
}
