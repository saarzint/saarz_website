import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Inbox, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";

const STATUS_BADGE: Record<
  string,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-blue-100 text-blue-700",
  },
  read: {
    label: "Read",
    className: "bg-gray-100 text-gray-600",
  },
  replied: {
    label: "Replied",
    className: "bg-green-100 text-green-700",
  },
  archived: {
    label: "Archived",
    className: "bg-orange-100 text-orange-600",
  },
};

async function getSubmissions() {
  try {
    return await db
      .select()
      .from(schema.contactSubmissions)
      .orderBy(desc(schema.contactSubmissions.createdAt));
  } catch {
    return null;
  }
}

export default async function AdminContactsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Contact Submissions"
        description="Messages submitted through the contact form"
      />

      {!submissions ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-800">
            Database not connected. Configure Supabase first.
          </p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center">
          <Inbox className="w-10 h-10 text-[#a3a3a3] mx-auto mb-3" />
          <p className="text-[#737373]">No submissions yet</p>
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
                  Subject
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Date
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {submissions.map((s) => {
                const badge =
                  STATUS_BADGE[s.status] ?? STATUS_BADGE.read;
                return (
                  <tr
                    key={s.id}
                    className={`hover:bg-[#f9f9f9] ${s.status === "new" ? "font-semibold" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <p className="text-[#0b0e19]">{s.fullName}</p>
                      <p className="text-xs text-[#a3a3a3] mt-0.5">
                        {s.email}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#555] max-w-xs truncate">
                      {s.subject}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#737373] whitespace-nowrap">
                      {s.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/contacts/${s.id}`}
                          className="p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] hover:text-[#7d25cd] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={s.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
