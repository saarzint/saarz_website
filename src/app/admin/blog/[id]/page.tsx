import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BlogForm from "../BlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post] = await db
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.id, id))
    .limit(1);

  if (!post) return notFound();

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Edit Blog Post"
        description={`Editing: ${post.title}`}
      />
      <BlogForm post={post} />
    </div>
  );
}
