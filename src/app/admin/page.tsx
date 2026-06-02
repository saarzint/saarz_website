import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  FolderKanban,
  Users,
  MessageSquare,
  UserPlus,
  Inbox,
} from "lucide-react";

async function getCounts() {
  try {
    // Single round-trip — much faster than separate count queries via the pooler.
    const [row] = await db.execute<{
      posts: number;
      services: number;
      projects: number;
      team: number;
      testimonials: number;
      jobs: number;
      contacts: number;
    }>(sql`
      SELECT
        (SELECT count(*)::int FROM blog_posts) AS posts,
        (SELECT count(*)::int FROM services) AS services,
        (SELECT count(*)::int FROM projects) AS projects,
        (SELECT count(*)::int FROM team_members) AS team,
        (SELECT count(*)::int FROM testimonials) AS testimonials,
        (SELECT count(*)::int FROM jobs) AS jobs,
        (SELECT count(*)::int FROM contact_submissions) AS contacts
    `);
    return row;
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const stats = counts
    ? [
        {
          label: "Blog Posts",
          value: counts.posts,
          icon: FileText,
          href: "/admin/blog",
        },
        {
          label: "Services",
          value: counts.services,
          icon: Briefcase,
          href: "/admin/services",
        },
        {
          label: "Projects",
          value: counts.projects,
          icon: FolderKanban,
          href: "/admin/projects",
        },
        {
          label: "Team Members",
          value: counts.team,
          icon: Users,
          href: "/admin/team",
        },
        {
          label: "Testimonials",
          value: counts.testimonials,
          icon: MessageSquare,
          href: "/admin/testimonials",
        },
        {
          label: "Open Jobs",
          value: counts.jobs,
          icon: UserPlus,
          href: "/admin/jobs",
        },
        {
          label: "Contact Messages",
          value: counts.contacts,
          icon: Inbox,
          href: "/admin/contacts",
        },
      ]
    : null;

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your content"
      />

      {!stats ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="font-semibold text-yellow-900">
            Database not connected
          </p>
          <p className="text-sm text-yellow-800 mt-1">
            Add Supabase credentials to <code>.env</code>, run{" "}
            <code>npm run db:push</code>, then <code>npm run db:seed</code>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-2xl border border-[#e5e5e5] p-6 hover:border-[#7d25cd]/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3caefc]/10 to-[#7d25cd]/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#7d25cd]" />
                </div>
                <span className="text-3xl font-bold text-[#0b0e19]">
                  {s.value}
                </span>
              </div>
              <p className="text-sm font-medium text-[#555]">{s.label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
