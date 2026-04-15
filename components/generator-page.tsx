"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { ShiningText } from "@/components/ui/shining-text";
import { ToneSelector } from "@/components/tone-selector";
import { OutputSection } from "@/components/output-section";
import type { Tone, GenerationOutput } from "@/lib/prompts";

interface GeneratorPageProps {
  onBack: () => void;
}

export function GeneratorPage({ onBack }: GeneratorPageProps) {
  const [selectedTone, setSelectedTone] = React.useState<Tone>("casual");
  const [isLoading, setIsLoading] = React.useState(false);
  const [output, setOutput] = React.useState<GenerationOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [lastInput, setLastInput] = React.useState("");
  const [refinementQuestions, setRefinementQuestions] = React.useState<string[] | null>(null);

  const handleSend = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setOutput(null);
    setRefinementQuestions(null);
    setLastInput(message);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription: message,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      // Handle refinement questions (product too vague)
      if (data.needsRefinement && data.questions) {
        setRefinementQuestions(data.questions);
        setIsLoading(false);
        return;
      }

      if (data.success && data.data) {
        setOutput(data.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastInput) handleSend(lastInput);
  };

  const handleNewGeneration = () => {
    setOutput(null);
    setError(null);
    setLastInput("");
    setRefinementQuestions(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[350px] h-[350px] bg-orange-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-rose-500/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#1a1a1e]">
        <button onClick={onBack} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Redo<span className="text-orange-400">.Ai</span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          {output && (
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2a2a2f] text-gray-400 text-sm hover:text-white hover:border-[#3a3a40] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        {/* Header — only when no output */}
        {!output && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              What are you selling?
            </h2>
            <p className="text-gray-500 text-base">
              Describe your product and we&apos;ll create everything you need to
              market it.
            </p>
          </motion.div>
        )}

        {/* Tone selector — only when no output */}
        {!output && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <ToneSelector
              value={selectedTone}
              onChange={setSelectedTone}
              disabled={isLoading}
            />
          </motion.div>
        )}

        {/* Refinement questions */}
        {refinementQuestions && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl border border-orange-500/20 bg-orange-500/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">
                We need a bit more detail to generate great copy
              </span>
            </div>
            <ul className="space-y-2">
              {refinementQuestions.map((q, i) => (
                <li
                  key={i}
                  className="text-gray-300 text-sm pl-4 border-l-2 border-orange-500/30"
                >
                  {q}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs mt-3">
              Add these details to your description below and try again.
            </p>
          </motion.div>
        )}

        {/* Input box — visible when no output */}
        {!output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PromptInputBox
              onSend={handleSend}
              isLoading={isLoading}
              placeholder="e.g. Handmade soy candles with unique scents like 'Sunday Morning Coffee' — eco-friendly, 40hr burn time, glass jar..."
            />
            <p className="text-center text-gray-600 text-xs mt-3">
              Tip: The more detail you give, the better the output. Include
              target audience, price range, and key differentiators.
            </p>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity },
                }}
                style={{ opacity: 0.2 }}
              />
              <div className="absolute inset-[6px] rounded-xl bg-[#0a0a0d] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
            </div>
            <ShiningText
              text="Redo.Ai is crafting your content..."
              className="text-base font-medium"
            />
            <p className="text-gray-600 text-sm">
              This usually takes about 10 seconds
            </p>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm text-center"
          >
            {error}
            <button
              onClick={handleRegenerate}
              className="ml-2 underline hover:text-red-300 transition-colors"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Output display */}
        {output && (
          <div className="mt-2">
            <OutputSection data={output} />
          </div>
        )}

        {/* New generation CTA */}
        {output && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10 pb-10"
          >
            <button
              onClick={handleNewGeneration}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-medium shadow-lg shadow-orange-500/15 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Generate for another product
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
