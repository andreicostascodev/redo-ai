"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Target, MessageSquare, Tag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import type { GenerationOutput } from "@/lib/prompts";

interface OutputSectionProps {
  data: GenerationOutput;
}

const TABS = [
  { id: "description", label: "Description", icon: FileText },
  { id: "ads", label: "Ad Copies", icon: Target },
  { id: "posts", label: "Social Posts", icon: MessageSquare },
  { id: "slogan", label: "Slogan", icon: Tag },
] as const;

type TabId = (typeof TABS)[number]["id"];

function platformEmoji(platform: string) {
  if (platform === "TikTok") return "🎵";
  if (platform === "Instagram") return "📸";
  return "📘";
}

export function OutputSection({ data }: OutputSectionProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>("description");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111114] border border-[#1e1e22] mb-4 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-[#1e1e22] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Product Description */}
          {activeTab === "description" && (
            <div className="rounded-2xl border border-[#1e1e22] bg-[#0e0e11] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  Product Description
                </h3>
                <CopyButton text={data.product_description} />
              </div>
              <p className="text-gray-300 leading-relaxed text-[15px] whitespace-pre-line">
                {data.product_description}
              </p>
            </div>
          )}

          {/* Ad Copies */}
          {activeTab === "ads" && (
            <div className="space-y-3">
              {data.ad_copies?.map((ad, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#1e1e22] bg-[#0e0e11] p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <span className="text-lg">{platformEmoji(ad.platform)}</span>
                      {ad.platform}
                    </span>
                    <CopyButton text={ad.copy} />
                  </div>
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    {ad.copy}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Social Posts */}
          {activeTab === "posts" && (
            <div className="space-y-3">
              {data.social_posts?.map((post, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#1e1e22] bg-[#0e0e11] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-gray-300 text-[15px] leading-relaxed">
                        {post}
                      </p>
                    </div>
                    <CopyButton text={post} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Slogan */}
          {activeTab === "slogan" && (
            <div className="rounded-2xl border border-[#1e1e22] bg-[#0e0e11] p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
                <Star className="w-3.5 h-3.5" />
                YOUR BRAND LINE
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
                &ldquo;{data.slogan}&rdquo;
              </p>
              <CopyButton text={data.slogan} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
