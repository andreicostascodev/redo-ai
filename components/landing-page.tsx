"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  ArrowRight,
  FileText,
  Target,
  Lightbulb,
  Tag,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Product Description",
    desc: "Persuasive, benefit-focused copy that converts browsers into buyers",
  },
  {
    icon: Target,
    title: "3 Ad Copies",
    desc: "Platform-optimized ads for TikTok, Instagram, and Facebook",
  },
  {
    icon: Lightbulb,
    title: "5 Post Ideas",
    desc: "Scroll-stopping social content with hooks and CTAs",
  },
  {
    icon: Tag,
    title: "Brand Slogan",
    desc: "One killer line that defines your brand identity",
  },
];

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-rose-500/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Redo<span className="text-orange-400">.Ai</span>
          </span>
        </div>
        <button
          onClick={onGetStarted}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Start Free <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 md:pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-medium mb-8 tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            AI-POWERED MARKETING ENGINE
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Turn any product into
          <br />
          <span className="gradient-text">marketing gold</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Describe your product. Get ad copies, social posts, product
          descriptions, and a brand slogan — all in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300"
          >
            Generate Content Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-600 text-sm mt-4">
            No sign-up required for your first generation
          </p>
        </motion.div>
      </div>

      {/* Feature grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="group p-6 rounded-2xl border border-[#1e1e22] bg-[#0e0e11]/60 backdrop-blur-sm hover:border-[#2a2a30] hover:bg-[#111114] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/10 flex items-center justify-center mb-4 group-hover:border-orange-500/20 transition-colors">
                <f.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-1.5">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
