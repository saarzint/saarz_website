"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";
import { saveProject } from "./actions";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/db/schema";
import { Save, Loader2, X } from "lucide-react";

interface Props {
  project?: Project;
}

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [images, setImages] = useState<string[]>(project?.images ?? []);
  const [pendingImage, setPendingImage] = useState("");
  const [techStr, setTechStr] = useState(
    (project?.technologies ?? []).join(", "),
  );
  const [url, setUrl] = useState(project?.url ?? "");
  const [sortOrder, setSortOrder] = useState(project?.sortOrder ?? 0);
  const [featured, setFeatured] = useState(project?.featured ?? false);

  function handleNameChange(v: string) {
    setName(v);
    if (!project) setSlug(slugify(v));
  }

  function addImage(url: string) {
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setPendingImage("");
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const safeImages = images.filter(Boolean);
    const technologies = techStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    start(async () => {
      await saveProject({
        id: project?.id,
        slug: slug || slugify(name),
        name,
        category,
        description,
        images: safeImages,
        technologies,
        url,
        sortOrder: Number(sortOrder),
        featured,
      });
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
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
              Category *
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
              placeholder="Web, AI, Mobile"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Images
          </label>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-3">
              {images.map((src, i) => (
                <div key={i} className="relative">
                  <Image
                    src={src}
                    alt=""
                    width={200}
                    height={120}
                    className="rounded-xl border border-[#e5e5e5] object-cover w-full h-24"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageUpload
            value={pendingImage}
            onChange={addImage}
            folder="projects"
            label="Add an image"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={techStr}
            onChange={(e) => setTechStr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            placeholder="Next.js, TypeScript, PostgreSQL"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex items-center justify-between sticky bottom-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded accent-[#7d25cd]"
          />
          <span className="text-sm font-medium text-[#0b0e19]">
            {featured ? "Featured" : "Not Featured"}
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
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
            {project ? "Update" : "Create"} Project
          </button>
        </div>
      </div>
    </form>
  );
}
