"use client";

import { motion } from "framer-motion";
import DashedBorder from "@/components/ui/DashedBorder";

interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  description,
}: PageHeroProps) {
  return (
    <section className="relative bg-[#ebebeb]">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" />
          <DashedBorder position="bottom" />
          <DashedBorder position="left" />
          <DashedBorder position="right" />

          <div className="pt-32 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#7d25cd]/10 text-[#7d25cd] text-sm font-semibold mb-5 border border-[#7d25cd]/20">
                {badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0e19] mb-4">
                {titleHighlight ? (
                  <>
                    {title}{" "}
                    <span className="bg-gradient-to-br from-[#0b0e19] to-[#0b0e19]/60 bg-clip-text text-transparent">
                      {titleHighlight}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-lg text-[#737373] max-w-2xl mx-auto">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
