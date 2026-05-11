"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, X, Upload } from "lucide-react";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";

export interface CareersJob {
  id: number;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
}

interface CareersClientProps {
  jobs: CareersJob[];
}

export default function CareersClient({ jobs }: CareersClientProps) {
  const [openDialog, setOpenDialog] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Join Our Team"
        title="Careers at SAARZ"
        description="Build your career with a team that's passionate about technology and innovation"
      />

      {/* Why Join Us */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0b0e19] mb-4">
                  Why Join SAARZ?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Remote-First Culture",
                    desc: "Work from anywhere in the world with flexible hours that suit your lifestyle.",
                  },
                  {
                    title: "Growth Opportunities",
                    desc: "Continuous learning with access to courses, conferences, and mentorship programs.",
                  },
                  {
                    title: "Impactful Work",
                    desc: "Work on diverse projects for clients worldwide, making a real difference.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="p-8 rounded-[28px] bg-white border border-[#e5e5e5] text-center hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-[#0b0e19] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative bg-[#ebebeb]">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0b0e19] mb-4">
                  Open Positions
                </h2>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {jobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-[28px] p-6 md:p-8 border border-[#e5e5e5] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#0b0e19]">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#3caefc]/10 text-[#3caefc]">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#737373]">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                        </div>
                        <p className="text-[#555] mt-3 text-sm">
                          {job.description}
                        </p>
                      </div>
                      <Button
                        onClick={() => setOpenDialog(job.id)}
                        size="sm"
                        className="flex-shrink-0"
                      >
                        Apply Now
                      </Button>
                    </div>

                    {/* Requirements */}
                    <div className="mt-5 pt-5 border-t border-[#e5e5e5]">
                      <p className="text-sm font-semibold text-[#0b0e19] mb-3">
                        Requirements:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {job.requirements.map((req) => (
                          <li
                            key={req}
                            className="flex items-start gap-2 text-sm text-[#555]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7d25cd] flex-shrink-0 mt-1.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Dialog */}
      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpenDialog(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[28px] p-8 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0b0e19]">
                Apply for {jobs.find((j) => j.id === openDialog)?.title}
              </h3>
              <button
                onClick={() => setOpenDialog(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenDialog(null);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-[#0b0e19] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0b0e19] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0b0e19] mb-1">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-6 text-center hover:border-[#3caefc] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[#737373] mx-auto mb-2" />
                  <p className="text-sm text-[#555]">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-[#737373] mt-1">
                    PDF, DOC up to 5MB
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0b0e19] mb-1">
                  Cover Letter
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none"
                  placeholder="Why are you interested in this role?"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gradient text-white font-semibold py-3 rounded-xl cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <CTASection />
    </>
  );
}
