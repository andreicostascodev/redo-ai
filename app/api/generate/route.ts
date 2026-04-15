import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  REFINEMENT_SYSTEM_PROMPT,
  buildUserPrompt,
  buildRefinementPrompt,
  type GenerationRequest,
  type GenerationOutput,
  type Tone,
} from "@/lib/prompts";

// ─── POST /api/generate ───
// Accepts: { productDescription: string, tone: Tone }
// Returns: GenerationOutput JSON

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productDescription, tone } = body as GenerationRequest;

    // Validate inputs
    if (!productDescription || typeof productDescription !== "string") {
      return NextResponse.json(
        { error: "Product description is required" },
        { status: 400 }
      );
    }

    const validTones: Tone[] = ["luxury", "casual", "aggressive", "minimalist"];
    const safeTone = validTones.includes(tone) ? tone : "casual";

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add ANTHROPIC_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // If input is too short, ask refinement questions
    if (productDescription.trim().split(/\s+/).length < 5) {
      const refineResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: REFINEMENT_SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: buildRefinementPrompt(productDescription),
            },
          ],
        }),
      });

      const refineData = await refineResponse.json();
      const refineText = refineData.content
        ?.map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : ""))
        .filter(Boolean)
        .join("");

      if (refineText) {
        try {
          const questions = JSON.parse(refineText.replace(/```json|```/g, "").trim());
          return NextResponse.json({ needsRefinement: true, questions });
        } catch {
          // If parsing fails, proceed with generation anyway
        }
      }
    }

    // Main generation
    const request: GenerationRequest = {
      productDescription,
      tone: safeTone,
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(request),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", errData);
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content
      ?.map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : ""))
      .filter(Boolean)
      .join("");

    if (!text) {
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 502 }
      );
    }

    // Parse JSON response
    const cleaned = text.replace(/```json|```/g, "").trim();
    const output: GenerationOutput = JSON.parse(cleaned);

    // Validate output structure
    if (
      !output.product_description ||
      !output.ad_copies ||
      !output.social_posts ||
      !output.slogan
    ) {
      return NextResponse.json(
        { error: "AI returned incomplete data. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: output });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
