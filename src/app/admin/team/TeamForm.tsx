"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import { saveTeamMember } from "./actions";
import type { TeamMember } from "@/lib/db/schema";
import { Save, Loader2 } from "lucide-react";

interface Props {
  member?: TeamMember;
}

export default function TeamForm({ member }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [name, setName] = useState(member?.name ?? "");
  const [role, setRole] = useState(member?.role ?? "");
  const [image, setImage] = useState(member?.image ?? "");
  const [bio, setBio] = useState(member?.bio ?? "");
  const [linkedin, setLinkedin] = useState(member?.linkedin ?? "");
  const [twitter, setTwitter] = useState(member?.twitter ?? "");
  const [sortOrder, setSortOrder] = useState(member?.sortOrder ?? 0);
  const [active, setActive] = useState(member?.active ?? true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      await saveTeamMember({
        id: member?.id,
        name,
        role,
        image,
        bio,
        linkedin,
        twitter,
        sortOrder: Number(sortOrder),
        active,
      });
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Role *
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
        </div>

        <ImageUpload
          value={image}
          onChange={setImage}
          folder="team"
          label="Profile Image"
        />

        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              LinkedIn URL
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Twitter URL
            </label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
            />
          </div>
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
            onClick={() => router.push("/admin/team")}
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
            {member ? "Update" : "Create"} Member
          </button>
        </div>
      </div>
    </form>
  );
}
