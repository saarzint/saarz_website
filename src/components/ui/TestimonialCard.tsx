"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  image: string;
}

export default function TestimonialCard({
  name,
  text,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[28px] p-8 border border-[#e5e5e5] h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-[#555] leading-relaxed flex-1">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#e5e5e5]">
        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#e5e5e5]">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-[#0b0e19] text-sm">{name}</p>
          <p className="text-xs text-[#a3a3a3]">Verified Client</p>
        </div>
      </div>
    </div>
  );
}
