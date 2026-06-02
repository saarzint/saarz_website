"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowLeft } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import DashedBorder from "@/components/ui/DashedBorder";
import CTASection from "@/components/sections/CTASection";

interface BlogDetailContentProps {
  post: {
    slug: string;
    title: string;
    description: string;
    content: string;
    coverImage: string;
    author: string;
    readTime: number;
    tags: string[];
    date: string;
  };
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        badge={post.tags[0] ?? "Article"}
        title={post.title}
        description={post.description}
      />

      <section className="relative bg-light">
        <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="relative px-3 md:px-6">
            <DashedBorder position="top" />
            <DashedBorder position="bottom" />
            <DashedBorder position="left" />
            <DashedBorder position="right" />
            <div className="py-16 md:py-24">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#3caefc] transition-colors mb-10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                {post.coverImage && (
                  <div className="relative w-full h-72 md:h-96 rounded-[24px] overflow-hidden mb-10">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 896px"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#7d25cd]/5 text-[#7d25cd] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm text-[#737373] mb-10 pb-8 border-b border-[#e5e5e5]">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                </div>

                <div
                  className="blog-prose"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
