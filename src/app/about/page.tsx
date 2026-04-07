"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import { Target, Eye, Lightbulb, Users, Award, Clock } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We craft digital products that inspire, engage, and perform — helping businesses reach their full potential.",
  },
  {
    icon: Eye,
    title: "Visionary Approach",
    description:
      "We look beyond the current trends to build solutions that stand the test of time and evolve with your business.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We leverage cutting-edge technologies and creative thinking to solve complex business challenges.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Your success is our success. We work as an extension of your team with transparent communication.",
  },
];

const stats = [
  { icon: Award, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Clock, value: "5+", label: "Years of Experience" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="About SAARZ Int."
        title="We Build Digital"
        titleHighlight="Experiences"
        description="Learn about our mission, values, and commitment to delivering innovative digital solutions since 2020."
      />

      {/* Story Section */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="relative rounded-[28px] overflow-hidden">
                      <Image
                        src="/pics/about_us_1.png"
                        alt="About SAARZ Int."
                        width={600}
                        height={450}
                        className="object-cover w-full"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-[28px] bg-gradient-to-br from-[#3caefc] to-[#7d25cd] flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-3xl font-bold">5+</p>
                        <p className="text-xs">Years</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-[#7d25cd] uppercase tracking-wider">
                    Our Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0b0e19] mt-2 mb-6">
                    Why Choose SAARZ Int.?
                  </h2>
                  <p className="text-[#555] leading-relaxed mb-4">
                    Founded in 2020 by Zaryab Raza, SAARZ Int. was born from a
                    vision to deliver world-class digital solutions that empower
                    businesses to thrive in the digital age.
                  </p>
                  <p className="text-[#555] leading-relaxed mb-6">
                    We are a team of passionate developers, designers, and
                    strategists committed to crafting digital products that inspire,
                    engage, and perform. From AI-powered solutions to cloud
                    infrastructure, we bring innovation to every project.
                  </p>
                  <Button href="/contact">Work With Us</Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-[#ebebeb]">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <SectionHeading
                title="Our Core Values"
                subtitle="The principles that drive everything we do"
                gradient
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-[28px] p-8 border border-[#e5e5e5] hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3caefc]/10 to-[#7d25cd]/10 flex items-center justify-center mx-auto mb-5">
                      <v.icon className="w-7 h-7 text-[#7d25cd]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b0e19] mb-3">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      {v.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="text-center p-8 rounded-[28px] bg-white border border-[#e5e5e5]"
                  >
                    <s.icon className="w-8 h-8 text-[#3caefc] mx-auto mb-3" />
                    <p className="text-4xl font-bold gradient-text">{s.value}</p>
                    <p className="text-[#737373] mt-2">{s.label}</p>
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
