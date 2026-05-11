import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BlogForm from "../BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="p-8">
      <AdminPageHeader
        title="New Blog Post"
        description="Create and publish a new article"
      />
      <BlogForm />
    </div>
  );
}
