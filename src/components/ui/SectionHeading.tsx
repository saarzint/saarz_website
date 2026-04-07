"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  gradient = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
          gradient
            ? "gradient-text"
            : light
              ? "text-white"
              : "text-[#0b0e19]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-white/60" : "text-[#737373]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
