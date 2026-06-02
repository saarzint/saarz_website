"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-data";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import DashedBorder from "@/components/ui/DashedBorder";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0b0e19] text-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="relative px-3 md:px-6">
          <DashedBorder position="top" color="rgba(255,255,255,0.1)" />
          <DashedBorder position="left" color="rgba(255,255,255,0.1)" />
          <DashedBorder position="right" color="rgba(255,255,255,0.1)" />

          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="space-y-5">
                <Link href="/" className="inline-block relative w-[130px] h-[40px]">
                  <Image
                    src="/pics/01/S-logo1.png"
                    alt="SAARZ Int."
                    fill
                    sizes="130px"
                    className="object-contain brightness-0 invert"
                  />
                </Link>
                <p className="text-white/40 text-sm leading-relaxed">
                  Empowering businesses with cutting-edge technology, design and
                  strategy since {siteConfig.founded}.
                </p>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#3caefc] hover:border-[#3caefc] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#3caefc] hover:border-[#3caefc] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-5">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: "About Us", href: "/about" },
                    { label: "Services", href: "/services" },
                    { label: "Our Work", href: "/our-work" },
                    { label: "Blog", href: "/blog" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/40 text-sm hover:text-[#3caefc] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-5">
                  Services
                </h4>
                <ul className="space-y-3">
                  {[
                    {
                      label: "AI Development",
                      href: "/services/ai-development",
                    },
                    {
                      label: "Cloud Infrastructure",
                      href: "/services/cloud-infrastructure",
                    },
                    {
                      label: "Web Development",
                      href: "/services/web-development",
                    },
                    {
                      label: "Mobile Development",
                      href: "/services/mobile-development",
                    },
                    {
                      label: "SaaS Development",
                      href: "/services/saas-development",
                    },
                    { label: "Support 24/7", href: "/services/support" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/40 text-sm hover:text-[#3caefc] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-5">
                  Contact Us
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#3caefc] flex-shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white/40 text-sm hover:text-[#3caefc] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#3caefc] flex-shrink-0 mt-0.5" />
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-white/40 text-sm hover:text-[#3caefc] transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#3caefc] flex-shrink-0 mt-0.5" />
                    <span className="text-white/40 text-sm">
                      {siteConfig.contact.address}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
                reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#3caefc] hover:border-[#3caefc] transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
