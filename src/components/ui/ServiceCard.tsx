"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Cloud,
  Rocket,
  Layers,
  Globe,
  Smartphone,
  FileText,
  Headphones,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cloud,
  Rocket,
  Layers,
  Globe,
  Smartphone,
  FileText,
  Headphones,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  index: number;
}

export default function ServiceCard({
  slug,
  title,
  description,
  icon,
  image,
  index,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/services/${slug}`} className="group block">
        <div className="bg-white rounded-[28px] overflow-hidden border border-[#e5e5e5] hover:border-[#3caefc]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg">
          <div className="relative h-48 overflow-hidden bg-[#f5f5f5]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-[#0b0e19] mb-2 group-hover:text-[#3caefc] transition-colors">
              {title}
            </h3>
            <p className="text-[#737373] text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
            <div className="mt-4 flex items-center text-sm font-semibold text-[#7d25cd] group-hover:text-[#3caefc] transition-colors">
              Learn more
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
