"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site-data";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm py-3" : "bg-white py-5"
      }`}
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative w-[130px] h-[40px]">
            <Image
              src="/pics/01/S-logo1.png"
              alt="SAARZ Int."
              fill
              sizes="130px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    pathname === link.href
                      ? "text-[#7d25cd]"
                      : "text-[#555] hover:text-[#0b0e19]"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                  )}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#e5e5e5] py-2 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#555] hover:text-[#7d25cd] hover:bg-[#f5f5f5] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button href="/contact" size="sm" className="hidden md:inline-flex">
              Get a Free Quote
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#555] hover:bg-[#f5f5f5] transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-[#e5e5e5] px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#7d25cd] bg-[#7d25cd]/5"
                    : "text-[#555] hover:text-[#0b0e19] hover:bg-[#f5f5f5]"
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-6 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 rounded-xl text-sm text-[#737373] hover:text-[#7d25cd] hover:bg-[#f5f5f5] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Button
              href="/contact"
              size="sm"
              className="w-full justify-center"
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
