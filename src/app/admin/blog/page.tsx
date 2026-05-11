import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Plus, Pencil, FileText } from "lucide-react";
import DeleteButton from "./DeleteButton";

async function getPosts() {
  try {
    return await db
      .select()
      .from(schema.blogPosts)
      .orderBy(desc(schema.blogPosts.createdAt));
  } catch {
    return null;
  }
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Blog Posts"
        description="Write, edit, publish blog content"
        action={
          <Link
            href="/admin/blog/new"
            className="btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        }
      />

      {!posts ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-800">
            Database not connected. Configure Supabase first.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center">
          <FileText className="w-10 h-10 text-[#a3a3a3] mx-auto mb-3" />
          <p className="text-[#737373]">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="inline-block mt-4 text-sm font-semibold text-[#7d25cd] hover:underline"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9f9f9] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Title
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-5 py-3">
                  Updated
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0b0e19]">
                      {post.title}
                    </p>
                    <p className="text-xs text-[#a3a3a3] mt-0.5">
                      /{post.slug}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {post.published ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#737373]">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] hover:text-[#7d25cd] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={post.id} />
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
