"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

interface BlogListClientProps {
  blogPosts: BlogPost[];
}

export default function BlogListClient({ blogPosts }: BlogListClientProps) {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Insights & Articles"
        title="Our Blog"
        description="Stay updated with the latest insights in technology, development, and digital innovation"
      />

      {/* Blog Grid */}
      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-28">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="bg-white rounded-[28px] overflow-hidden border border-[#e5e5e5] hover:-translate-y-2 transition-all duration-500">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2.5 py-1 rounded-full bg-[#7d25cd]/5 text-[#7d25cd] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-xl font-bold text-[#0b0e19] group-hover:text-[#3caefc] transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-sm text-[#555] leading-relaxed line-clamp-3 mb-4">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[#737373] pt-4 border-t border-[#e5e5e5]">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
