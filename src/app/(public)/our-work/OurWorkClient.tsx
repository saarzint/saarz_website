"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import { categoryKey, normalizeCategory } from "@/lib/utils";

interface Project {
  id: string | number;
  name: string;
  category: string;
  description: string;
  images: string[];
  technologies: string[];
}

interface OurWorkClientProps {
  projects: Project[];
}

export default function OurWorkClient({ projects }: OurWorkClientProps) {
  const categories = [
    "All",
    ...Array.from(
      new Map(
        projects.map((project) => [
          categoryKey(project.category),
          normalizeCategory(project.category),
        ])
      ).values()
    ),
  ];

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => categoryKey(p.category) === categoryKey(active));

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Portfolio"
        title="Our Work"
        description="Explore our portfolio of successful projects across various industries"
      />

      {/* Portfolio */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      active === cat
                        ? "btn-gradient text-white"
                        : "bg-white border border-[#e5e5e5] text-[#555] hover:text-[#7d25cd] hover:border-[#7d25cd]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    name={project.name}
                    category={project.category}
                    description={project.description}
                    images={project.images}
                    technologies={project.technologies}
                    index={i}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
