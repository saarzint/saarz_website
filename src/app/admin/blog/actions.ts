"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

interface BlogFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: number;
  tags: string[];
  published: boolean;
}

export async function saveBlogPost(data: BlogFormData) {
  await requireAdmin();

  const slug = data.slug || slugify(data.title);
  const publishedAt =
    data.published && !data.id ? new Date() : undefined;

  if (data.id) {
    await db
      .update(schema.blogPosts)
      .set({
        slug,
        title: data.title,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage || null,
        author: data.author,
        readTime: data.readTime,
        tags: data.tags,
        published: data.published,
        ...(publishedAt && { publishedAt }),
        updatedAt: new Date(),
      })
      .where(eq(schema.blogPosts.id, data.id));
  } else {
    await db.insert(schema.blogPosts).values({
      slug,
      title: data.title,
      description: data.description,
      content: data.content,
      coverImage: data.coverImage || null,
      author: data.author,
      readTime: data.readTime,
      tags: data.tags,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
    });
  }

  updateTag("blog-posts");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
  updateTag("blog-posts");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
