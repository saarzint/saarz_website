export const dynamic = "force-dynamic";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import { getServices, getTestimonials } from "@/lib/content";

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Partners />
      <ServicesPreview services={services} />
      <Testimonials testimonials={testimonials} />
      <CTASection />
    </>
  );
}
