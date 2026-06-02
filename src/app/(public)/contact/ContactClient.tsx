"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import { submitContactForm } from "./actions";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}

interface ContactClientProps {
  contact: ContactInfo;
}

export default function ContactClient({ contact }: ContactClientProps) {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("idle");
    startTransition(async () => {
      const result = await submitContactForm(formState);
      if ("error" in result) {
        setStatus("error");
        setErrorMessage(result.error);
      } else {
        setStatus("sent");
        setFormState({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    });
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Get In Touch"
        title="Contact Us"
        description="Have a project in mind? Let's talk about how we can help your business grow."
      />

      {/* Contact Section */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Info Cards */}
                <div className="lg:col-span-2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-[#0b0e19] mb-6">
                      Let&apos;s Start a Conversation
                    </h2>
                    <p className="text-[#555] mb-8">
                      We&apos;d love to hear about your project. Reach out and
                      we&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>

                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: contact.email,
                      href: `mailto:${contact.email}`,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: contact.phone,
                      href: `tel:${contact.phone}`,
                    },
                    {
                      icon: MapPin,
                      label: "Address",
                      value: contact.address,
                      href: undefined,
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-[28px] bg-white border border-[#e5e5e5] hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3caefc]/10 to-[#7d25cd]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#7d25cd]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#737373] mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#0b0e19] font-medium hover:text-[#3caefc] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#0b0e19] text-sm">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-3"
                >
                  {status === "sent" ? (
                    <div className="bg-white rounded-[28px] p-12 text-center border border-[#e5e5e5]">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b0e19] mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-[#555] mb-6">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setStatus("idle");
                          setFormState({
                            fullName: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="text-[#7d25cd] font-medium hover:underline cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white rounded-[28px] p-8 md:p-10 border border-[#e5e5e5]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            minLength={2}
                            maxLength={60}
                            value={formState.fullName}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all bg-white"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all bg-white"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={formState.phone}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all bg-white"
                            placeholder="+1 234 567 890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            required
                            minLength={4}
                            maxLength={50}
                            value={formState.subject}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                subject: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all bg-white"
                            placeholder="Project Inquiry"
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <label className="block text-sm font-medium text-[#0b0e19] mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          minLength={15}
                          maxLength={1000}
                          rows={5}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all resize-none bg-white"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="mt-6 w-full btn-gradient text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isPending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                      {status === "error" && (
                        <p className="mt-3 text-sm text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
