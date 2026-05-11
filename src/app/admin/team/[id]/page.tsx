import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamForm from "../TeamForm";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [member] = await db
    .select()
    .from(schema.teamMembers)
    .where(eq(schema.teamMembers.id, id))
    .limit(1);

  if (!member) return notFound();

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Edit Team Member"
        description={`Editing: ${member.name}`}
      />
      <TeamForm member={member} />
    </div>
  );
}
