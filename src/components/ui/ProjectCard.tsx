"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  category: string;
  description: string;
  images: string[];
  technologies: string[];
  index: number;
}

export default function ProjectCard({
  name,
  category,
  description,
  images,
  technologies,
  index,
}: ProjectCardProps) {
  const safeImages = images.filter(Boolean);
  const primaryImage = safeImages[0] ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border border-gray-100">
          <div className="relative h-64 overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f4f4f8] to-[#ece7f8] text-center px-6">
                <div>
                  <p className="text-sm font-semibold text-[#7d25cd] uppercase tracking-wider">
                    No Preview Image
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Project details only
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="p-5">
            <span className="text-xs font-semibold text-[#7d25cd] uppercase tracking-wider">
              {category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pt-20"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-[50vh] md:h-[40vh] bg-gray-100 flex-shrink-0">
              {safeImages.length > 0 ? (
                <Image
                  src={safeImages[currentImage]}
                  alt={`${name} - ${currentImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 80vw"
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      No preview image available
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      This project has text details only.
                    </p>
                  </div>
                </div>
              )}
              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImage(
                        (prev) => (prev - 1 + safeImages.length) % safeImages.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) => (prev + 1) % safeImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <span className="text-sm font-semibold text-[#7d25cd]">
                {category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {name}
              </h3>
              <p className="text-gray-500 mt-2">{description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-[#3caefc]/10 to-[#7d25cd]/10 text-[#7d25cd] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {safeImages.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {safeImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === currentImage
                          ? "bg-[#7d25cd]"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
