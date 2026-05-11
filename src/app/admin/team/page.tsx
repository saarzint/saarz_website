import { db, schema } from "@/lib/db";
import { asc } from "drizzle-orm";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Plus, Pencil, Users } from "lucide-react";
import DeleteButton from "./DeleteButton";

async function getMembers() {
  try {
    return await db
      .select()
      .from(schema.teamMembers)
      .orderBy(asc(schema.teamMembers.sortOrder));
  } catch {
    return null;
  }
}

export default async function AdminTeamPage() {
  const members = await getMembers();

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Team"
        description="Manage team members"
        action={
          <Link
            href="/admin/team/new"
            className="btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Member
          </Link>
        }
      />

      {!members ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-800">
            Database not connected. Configure Supabase first.
          </p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center">
          <Users className="w-10 h-10 text-[#a3a3a3] mx-auto mb-3" />
          <p className="text-[#737373]">No team members yet</p>
          <Link
            href="/admin/team/new"
            className="inline-block mt-4 text-sm font-semibold text-[#7d25cd] hover:underline"
          >
            Add your first member →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9f9f9] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0b0e19]">{m.name}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#555]">{m.role}</td>
                  <td className="px-5 py-4">
                    {m.active ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#737373]">
                    {m.sortOrder}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/team/${m.id}`}
                        className="p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] hover:text-[#7d25cd] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={m.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
