"use client";

import { motion } from "framer-motion";
import DashedBorder from "@/components/ui/DashedBorder";

export default function ServicesProcessSection() {
  return (
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
                Our Process
              </h2>
              <p className="text-[#737373] max-w-2xl mx-auto">
                A proven methodology that delivers results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "We understand your business goals, challenges, and requirements through in-depth consultation.",
                },
                {
                  step: "02",
                  title: "Design",
                  desc: "Our team creates intuitive designs and architectures tailored to your specific needs.",
                },
                {
                  step: "03",
                  title: "Development",
                  desc: "We build robust, scalable solutions using the latest technologies and best practices.",
                },
                {
                  step: "04",
                  title: "Delivery",
                  desc: "Rigorous testing, deployment, and ongoing support ensure your success.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative text-center p-8"
                >
                  <span className="text-7xl font-extrabold text-[#3caefc]/10">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#0b0e19] -mt-4 mb-3">
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
  );
}
