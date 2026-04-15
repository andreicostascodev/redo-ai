"use client";

import { useRouter } from "next/navigation";
import { GeneratorPage } from "@/components/generator-page";

export default function GeneratorRoute() {
  const router = useRouter();

  return <GeneratorPage onBack={() => router.push("/")} />;
}
