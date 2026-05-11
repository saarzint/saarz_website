"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { saveService } from "./actions";
import { slugify } from "@/lib/utils";
import type { Service } from "@/lib/db/schema";
import { Save, Loader2 } from "lucide-react";

const ICON_OPTIONS = [
  "Brain",
  "Cloud",
  "Rocket",
  "Layers",
  "Globe",
  "Smartphone",
  "FileText",
  "Headphones",
];

interface Props {
  service?: Service;
}

export default function ServiceForm({ service }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(service?.title ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [shortTitle, setShortTitle] = useState(service?.shortTitle ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [icon, setIcon] = useState(service?.icon ?? ICON_OPTIONS[0]);
  const [image, setImage] = useState(service?.image ?? "");
  const [featuresStr, setFeaturesStr] = useState(
    (service?.features ?? []).join("\n"),
  );
  const [sortOrder, setSortOrder] = useState(service?.sortOrder ?? 0);
  const [active, setActive] = useState(service?.active ?? true);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!service) setSlug(slugify(v));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const features = featuresStr
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    start(async () => {
      await saveService({
        id: service?.id,
        slug: slug || slugify(title),
        title,
        shortTitle,
        description,
        icon,
        image,
        features,
        sortOrder: Number(sortOrder),
        active,
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
              Short Title *
            </label>
            <input
              type="text"
              required
              value={shortTitle}
              onChange={(e) => setShortTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Icon *
            </label>
            <select
              required
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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

        <ImageUpload
          value={image}
          onChange={setImage}
          folder="services"
          label="Image"
        />

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Features (one per line)
          </label>
          <textarea
            rows={5}
            value={featuresStr}
            onChange={(e) => setFeaturesStr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all font-mono text-sm"
            placeholder={`Feature one\nFeature two\nFeature three`}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex items-center justify-between sticky bottom-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 rounded accent-[#7d25cd]"
          />
          <span className="text-sm font-medium text-[#0b0e19]">
            {active ? "Active" : "Inactive"}
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
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
            {service ? "Update" : "Create"} Service
          </button>
        </div>
      </div>
    </form>
  );
}
