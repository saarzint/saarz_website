"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import DashedBorder from "@/components/ui/DashedBorder";

interface Props {
  services: Array<{
    slug: string;
    title: string;
    description: string;
    icon: string;
    image: string;
  }>;
}

export default function ServicesPreview({ services }: Props) {
  const featured = services.slice(0, 6);

  return (
    <section className="relative bg-light">
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" />
          <DashedBorder position="bottom" />
          <DashedBorder position="left" />
          <DashedBorder position="right" />

          <div className="py-28">
            <SectionHeading
              title="Our Key Services"
              subtitle="Comprehensive digital solutions to power your business growth"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {featured.map((service, i) => (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  image={service.image}
                  index={i}
                />
              ))}
            </div>

            <div className="text-center mt-14">
              <Button href="/services" size="lg">
                Explore All Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
