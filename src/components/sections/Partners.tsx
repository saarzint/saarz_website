"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { partners } from "@/data/site-data";
import DashedBorder from "@/components/ui/DashedBorder";

export default function Partners() {
  return (
    <section className="relative bg-[#ebebeb]">
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" />
          <DashedBorder position="bottom" />
          <DashedBorder position="left" />
          <DashedBorder position="right" />

          <div className="py-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm font-semibold text-[#737373] uppercase tracking-widest mb-10"
            >
              Trusted by leading companies
            </motion.p>

            {/* Marquee with fade edges */}
            <div className="relative overflow-hidden">
              {/* Fade left */}
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#ebebeb] to-transparent z-10" />
              {/* Fade right */}
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#ebebeb] to-transparent z-10" />

              <div className="flex animate-[scroll_25s_linear_infinite] gap-16 items-center">
                {[...partners, ...partners].map((partner, i) => (
                  <div
                    key={`${partner.name}-${i}`}
                    className="flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain h-10 w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
