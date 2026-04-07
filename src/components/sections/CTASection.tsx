"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import DashedBorder from "@/components/ui/DashedBorder";

export default function CTASection() {
  return (
    <section className="relative bg-[#0b0e19]">
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" color="rgba(255,255,255,0.12)" />
          <DashedBorder position="bottom" color="rgba(255,255,255,0.12)" />
          <DashedBorder position="left" color="rgba(255,255,255,0.12)" />
          <DashedBorder position="right" color="rgba(255,255,255,0.12)" />

          <div className="py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
                Let&apos;s discuss your project and create something extraordinary
                together. Get a free consultation today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="white" size="lg">
                  Get a Free Quote
                </Button>
                <Button
                  href="/our-work"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!bg-white hover:!text-[#0b0e19]"
                >
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
