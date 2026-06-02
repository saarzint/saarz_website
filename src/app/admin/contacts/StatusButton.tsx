"use client";

import { useTransition } from "react";
import { updateSubmissionStatus, deleteSubmission } from "./actions";

interface Props {
  id: string;
  currentStatus: string;
}

export default function StatusButton({ id, currentStatus }: Props) {
  const [pending, start] = useTransition();

  function setStatus(status: string) {
    start(() => updateSubmissionStatus(id, status));
  }

  function handleDelete() {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    start(() => deleteSubmission(id));
  }

  return (
    <div className="flex flex-wrap gap-2">
      {currentStatus !== "read" && currentStatus !== "replied" && (
        <button
          onClick={() => setStatus("read")}
          disabled={pending}
          className="px-4 py-2 text-sm font-medium rounded-xl border border-[#e5e5e5] text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer disabled:opacity-50"
        >
          Mark as Read
        </button>
      )}
      {currentStatus !== "replied" && (
        <button
          onClick={() => setStatus("replied")}
          disabled={pending}
          className="px-4 py-2 text-sm font-medium rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer disabled:opacity-50"
        >
          Mark as Replied
        </button>
      )}
      {currentStatus !== "archived" && (
        <button
          onClick={() => setStatus("archived")}
          disabled={pending}
          className="px-4 py-2 text-sm font-medium rounded-xl border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer disabled:opacity-50"
        >
          Archive
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={pending}
        className="px-4 py-2 text-sm font-medium rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
