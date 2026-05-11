import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamForm from "../TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div className="p-8">
      <AdminPageHeader
        title="New Team Member"
        description="Add a new team member"
      />
      <TeamForm />
    </div>
  );
}
