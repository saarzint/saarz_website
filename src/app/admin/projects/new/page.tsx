import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="p-8">
      <AdminPageHeader
        title="New Project"
        description="Add a new portfolio project"
      />
      <ProjectForm />
    </div>
  );
}
