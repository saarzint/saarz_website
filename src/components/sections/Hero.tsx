"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { DashedBox } from "@/components/ui/DashedBorder";

export default function Hero() {
  return (
    <section className="relative bg-light">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-60" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <DashedBox className="min-h-[85vh] flex items-center px-3 md:px-6">
          <div className="py-28 w-full">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#7d25cd]/10 text-[#7d25cd] text-sm font-semibold mb-6 border border-[#7d25cd]/20">
                  Trusted Digital Solutions Partner
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0b0e19] leading-[1.05]"
              >
                Innovative Digital{" "}
                <span className="bg-gradient-to-br from-[#0b0e19] to-[#0b0e19]/60 bg-clip-text text-transparent">
                  Solutions
                </span>{" "}
                for a Connected World
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-[#555] mt-6 max-w-xl mx-auto leading-relaxed"
              >
                Empowering businesses with cutting-edge technology, design and
                strategy
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                <Button href="/services" size="lg">
                  Our Services
                </Button>
                <Button href="/contact" variant="outline" size="lg" className="!border-[#0b0e19] !text-[#0b0e19] hover:!bg-[#0b0e19] hover:!text-white">
                  Contact Us
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-12 mt-16"
              >
                {[
                  { value: "50+", label: "Projects Delivered" },
                  { value: "30+", label: "Happy Clients" },
                  { value: "5+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-4xl font-bold gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#737373] mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </DashedBox>
      </div>
    </section>
  );
}
