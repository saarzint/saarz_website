"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { services } from "@/data/site-data";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import { CheckCircle2 } from "lucide-react";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <>
      {/* Hero */}
      <PageHero
        badge={service.title}
        title={service.title}
        description={service.description}
      />

      {/* Content */}
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
                  <h2 className="text-3xl font-bold text-[#0b0e19] mb-6">
                    What We Offer
                  </h2>
                  <p className="text-[#555] leading-relaxed mb-8">
                    {service.description} Our expert team delivers tailored
                    solutions that drive results and help your business grow.
                  </p>
                  <div className="space-y-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3caefc] flex-shrink-0 mt-0.5" />
                        <span className="text-[#555]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Button href="/contact">Get Started</Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative rounded-[28px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={450}
                      className="object-cover w-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
