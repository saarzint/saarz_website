"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers } from "@/data/site-data";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

export default function OurTeamPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="The People Behind SAARZ"
        title="Our Team"
        description="Meet the talented people who make everything possible"
      />

      {/* Team Grid */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <SectionHeading
                title="Meet Our Experts"
                subtitle="A passionate team dedicated to your success"
                gradient
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-[28px] overflow-hidden border border-[#e5e5e5] hover:-translate-y-2 transition-all duration-500">
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#3caefc]"
                          >
                            <LinkedinIcon />
                          </a>
                        )}
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-bold text-[#0b0e19]">
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium text-[#7d25cd] mt-1">
                          {member.role}
                        </p>
                        <p className="text-sm text-[#555] mt-3 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
