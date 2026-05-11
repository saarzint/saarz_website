"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveJob } from "./actions";
import type { Job } from "@/lib/db/schema";
import { Save, Loader2 } from "lucide-react";

interface Props {
  job?: Job;
}

export default function JobForm({ job }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(job?.title ?? "");
  const [type, setType] = useState(job?.type ?? "Full Time");
  const [location, setLocation] = useState(job?.location ?? "");
  const [department, setDepartment] = useState(job?.department ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [requirementsStr, setRequirementsStr] = useState(
    (job?.requirements ?? []).join("\n"),
  );
  const [open, setOpen] = useState(job?.open ?? true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const requirements = requirementsStr
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);
    start(async () => {
      await saveJob({
        id: job?.id,
        title,
        type,
        location,
        department,
        description,
        requirements,
        open,
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
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Type *
            </label>
            <input
              type="text"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
              placeholder="Full Time"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Location *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Department *
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Requirements (one per line)
          </label>
          <textarea
            rows={6}
            value={requirementsStr}
            onChange={(e) => setRequirementsStr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all font-mono text-sm"
            placeholder={`5+ years experience\nStrong TypeScript skills`}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex items-center justify-between sticky bottom-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
            className="w-4 h-4 rounded accent-[#7d25cd]"
          />
          <span className="text-sm font-medium text-[#0b0e19]">
            {open ? "Open" : "Closed"}
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/jobs")}
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
            {job ? "Update" : "Create"} Job
          </button>
        </div>
      </div>
    </form>
  );
}
