"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import DashedBorder from "@/components/ui/DashedBorder";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    image: string;
  }>;
}

export default function Testimonials({ testimonials }: Props) {
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const current = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="relative bg-[#ebebeb]">
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" />
          <DashedBorder position="bottom" />
          <DashedBorder position="left" />
          <DashedBorder position="right" />

          <div className="py-28">
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Real feedback from businesses we've helped transform"
            />

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {current.map((t) => (
                    <TestimonialCard key={t.name} {...t} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <button
                    onClick={() =>
                      setPage((p) => (p - 1 + totalPages) % totalPages)
                    }
                    className="w-10 h-10 rounded-full border-2 border-[#e5e5e5] flex items-center justify-center hover:border-[#7d25cd] hover:text-[#7d25cd] transition-colors cursor-pointer bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          i === page
                            ? "bg-[#7d25cd] w-8"
                            : "bg-[#d4d4d4] hover:bg-[#a3a3a3]"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setPage((p) => (p + 1) % totalPages)}
                    className="w-10 h-10 rounded-full border-2 border-[#e5e5e5] flex items-center justify-center hover:border-[#7d25cd] hover:text-[#7d25cd] transition-colors cursor-pointer bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
