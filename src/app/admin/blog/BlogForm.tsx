"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/admin/RichEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { saveBlogPost } from "./actions";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/lib/db/schema";
import { Save, Loader2 } from "lucide-react";

interface Props {
  post?: BlogPost;
}

export default function BlogForm({ post }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [author, setAuthor] = useState(post?.author ?? "SAARZ Team");
  const [readTime, setReadTime] = useState(post?.readTime ?? 5);
  const [tagsStr, setTagsStr] = useState((post?.tags ?? []).join(", "));
  const [published, setPublished] = useState(post?.published ?? false);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!post) setSlug(slugify(v));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    start(async () => {
      await saveBlogPost({
        id: post?.id,
        slug: slug || slugify(title),
        title,
        description,
        content,
        coverImage,
        author,
        readTime: Number(readTime),
        tags,
        published,
      });
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            placeholder="An engaging post title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all font-mono text-sm"
              placeholder="auto-generated"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Read Time (min)
            </label>
            <input
              type="number"
              min={1}
              value={readTime}
              onChange={(e) => setReadTime(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Description (Excerpt) *
          </label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none"
            placeholder="One or two sentences summarizing the post"
          />
        </div>

        <ImageUpload
          value={coverImage}
          onChange={setCoverImage}
          folder="blog/covers"
          label="Cover Image"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
              placeholder="AI, Cloud, DevOps"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0b0e19] mb-2">
          Content *
        </label>
        <RichEditor value={content} onChange={setContent} />
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex items-center justify-between sticky bottom-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded accent-[#7d25cd]"
          />
          <span className="text-sm font-medium text-[#0b0e19]">
            {published ? "Published" : "Draft"}
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#555] hover:bg-[#f5f5f5] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="btn-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {post ? "Update" : "Create"} Post
          </button>
        </div>
      </div>
    </form>
  );
}
