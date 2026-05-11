"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteTestimonial } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => {
        if (!confirm("Delete this testimonial? This cannot be undone.")) return;
        start(() => deleteTestimonial(id));
      }}
      disabled={pending}
      className="p-2 rounded-lg text-[#555] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
