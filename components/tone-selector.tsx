"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Crown, Heart, Flame, Feather } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/prompts";

interface ToneOption {
  id: Tone;
  label: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  description: string;
}

const TONES: ToneOption[] = [
  {
    id: "luxury",
    label: "Luxury",
    icon: Crown,
    color: "#D4AF37",
    description: "Elegant, premium, aspirational",
  },
  {
    id: "casual",
    label: "Casual",
    icon: Heart,
    color: "#F472B6",
    description: "Friendly, warm, relatable",
  },
  {
    id: "aggressive",
    label: "Aggressive",
    icon: Flame,
    color: "#EF4444",
    description: "Bold, urgent, high-energy",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    icon: Feather,
    color: "#94A3B8",
    description: "Clean, simple, direct",
  },
];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 block px-1">
        Select tone
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {TONES.map((tone) => {
          const isSelected = value === tone.id;
          return (
            <motion.button
              key={tone.id}
              onClick={() => !disabled && onChange(tone.id)}
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              className={cn(
                "group p-3 rounded-xl border text-left transition-all duration-200",
                isSelected
                  ? "border-orange-500/40 bg-orange-500/5"
                  : "border-[#1e1e22] bg-[#0e0e11] hover:border-[#2a2a2f]",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <div className="flex items-center gap-2 mb-1">
                <tone.icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: isSelected ? tone.color : "#6b7280" }}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isSelected ? "text-white" : "text-gray-400"
                  )}
                >
                  {tone.label}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {tone.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
