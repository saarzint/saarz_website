import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <ServicesPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
