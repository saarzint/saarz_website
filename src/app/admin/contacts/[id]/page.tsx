import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { ArrowLeft } from "lucide-react";
import StatusButton from "../StatusButton";

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700" },
  read: { label: "Read", className: "bg-gray-100 text-gray-600" },
  replied: { label: "Replied", className: "bg-green-100 text-green-700" },
  archived: { label: "Archived", className: "bg-orange-100 text-orange-600" },
};

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [submission] = await db
    .select()
    .from(schema.contactSubmissions)
    .where(eq(schema.contactSubmissions.id, id))
    .limit(1);

  if (!submission) return notFound();

  // Mark as read if still new
  if (submission.status === "new") {
    await db
      .update(schema.contactSubmissions)
      .set({ status: "read", updatedAt: new Date() })
      .where(eq(schema.contactSubmissions.id, id));
    submission.status = "read";
  }

  const badge = STATUS_BADGE[submission.status] ?? STATUS_BADGE.read;

  return (
    <div className="p-8 max-w-3xl">
      <AdminPageHeader
        title="Contact Submission"
        description={`From ${submission.fullName}`}
        action={
          <Link
            href="/admin/contacts"
            className="flex items-center gap-2 text-sm font-medium text-[#555] hover:text-[#0b0e19] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
        {/* Meta header */}
        <div className="px-6 py-4 border-b border-[#e5e5e5] flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-[#a3a3a3] uppercase tracking-wider font-semibold mb-1">
              Received
            </p>
            <p className="text-sm text-[#555]">
              {submission.createdAt.toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Fields */}
        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-1">
              Full Name
            </p>
            <p className="text-[#0b0e19] font-medium">{submission.fullName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-1">
              Email
            </p>
            <a
              href={`mailto:${submission.email}`}
              className="text-[#7d25cd] hover:underline"
            >
              {submission.email}
            </a>
          </div>
          {submission.phone && (
            <div>
              <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-1">
                Phone
              </p>
              <a
                href={`tel:${submission.phone}`}
                className="text-[#0b0e19]"
              >
                {submission.phone}
              </a>
            </div>
          )}
          <div className={submission.phone ? "" : "sm:col-span-2"}>
            <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-1">
              Subject
            </p>
            <p className="text-[#0b0e19]">{submission.subject}</p>
          </div>
        </div>

        {/* Message */}
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">
            Message
          </p>
          <div className="bg-[#f9f9f9] border-l-4 border-[#7d25cd] rounded-r-xl px-5 py-4">
            <p className="text-[#0b0e19] text-sm leading-relaxed whitespace-pre-wrap">
              {submission.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#e5e5e5] bg-[#f9f9f9]">
          <StatusButton id={submission.id} currentStatus={submission.status} />
        </div>
      </div>
    </div>
  );
}
