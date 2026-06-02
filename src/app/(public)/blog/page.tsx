export const dynamic = "force-dynamic";
import { getBlogPosts } from "@/lib/content";
import BlogListClient from "./BlogListClient";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return <BlogListClient blogPosts={blogPosts} />;
}
