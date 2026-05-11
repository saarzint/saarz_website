import { getServices } from "@/lib/content";
import ServiceCard from "@/components/ui/ServiceCard";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import ServicesProcessSection from "./ServicesProcessSection";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="What We Offer"
        title="Our Services"
        description="Comprehensive digital solutions tailored to your business needs"
      />

      {/* All Services Grid */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {services.map((service, i) => (
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
            </div>
          </div>
        </div>
      </section>

      <ServicesProcessSection />

      <CTASection />
    </>
  );
}
