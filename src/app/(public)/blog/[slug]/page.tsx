import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/content";
import BlogDetailContent from "./BlogDetailContent";

function normalizeCoverImage(image?: string | null) {
  if (!image || image === "/pics/blog-images/blog03.jpg") return "/pics/blog_3.png";
  return image;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return notFound();

  return (
    <BlogDetailContent
      post={{
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: post.content,
        coverImage: normalizeCoverImage(post.coverImage),
        author: post.author,
        readTime: post.readTime,
        tags: (post.tags as string[]) ?? [],
        date: (post.publishedAt ?? post.createdAt).toISOString(),
      }}
    />
  );
}
