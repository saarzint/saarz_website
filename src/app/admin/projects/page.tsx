import { db, schema } from "@/lib/db";
import { asc } from "drizzle-orm";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Plus, Pencil, Briefcase } from "lucide-react";
import DeleteButton from "./DeleteButton";

async function getProjects() {
  try {
    return await db
      .select()
      .from(schema.projects)
      .orderBy(asc(schema.projects.sortOrder));
  } catch {
    return null;
  }
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Projects"
        description="Showcase portfolio projects"
        action={
          <Link
            href="/admin/projects/new"
            className="btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        }
      />

      {!projects ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-800">
            Database not connected. Configure Supabase first.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center">
          <Briefcase className="w-10 h-10 text-[#a3a3a3] mx-auto mb-3" />
          <p className="text-[#737373]">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-block mt-4 text-sm font-semibold text-[#7d25cd] hover:underline"
          >
            Create your first project →
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
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Featured
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0b0e19]">{p.name}</p>
                    <p className="text-xs text-[#a3a3a3] mt-0.5">/{p.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#555]">
                    {p.category}
                  </td>
                  <td className="px-5 py-4">
                    {p.featured ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#737373]">
                    {p.sortOrder}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] hover:text-[#7d25cd] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={p.id} />
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
