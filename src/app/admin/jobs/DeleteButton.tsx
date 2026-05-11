"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteJob } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => {
        if (!confirm("Delete this job? This cannot be undone.")) return;
        start(() => deleteJob(id));
      }}
      disabled={pending}
      className="p-2 rounded-lg text-[#555] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
