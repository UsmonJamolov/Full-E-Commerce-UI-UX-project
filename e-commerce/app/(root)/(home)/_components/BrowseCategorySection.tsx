"use client";

import {
  ArrowLeft,
  ArrowRight,
  Footprints,
  Shirt,
  Umbrella,
  Handbag,
  Backpack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";

type Category = {
  label: string;
  icon: React.ReactNode;
};

const JacketIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M26 8c2-2 10-2 12 0l2 4 6 2 9 12-2 28H37V36h-10v18H11L9 26l9-12 6-2 2-4Z" />
    <path d="M18 14l8 12" />
    <path d="M46 14l-8 12" />
    <path d="M32 20v34" />
    <path d="M32 8v12" />
    <path d="M29 8h6" />
    <path d="M26.5 26v10" />
    <path d="M37.5 26v10" />
    <path d="M22 40l-3 8" />
    <path d="M42 40l3 8" />
    <path d="M12 54h14" />
    <path d="M38 54h14" />
  </svg>
);

const categories: Category[] = [
  { label: "Oyoq kiyim", icon: <Footprints size={40} /> },
  { label: "Futbolka", icon: <Shirt size={40} /> },
  { label: "Kurtka", icon: <JacketIcon /> },
  { label: "Zontik", icon: <Umbrella size={40} /> },
  { label: "Sumka", icon: <Handbag size={40} /> },
  { label: "Ryukzak", icon: <Backpack size={40} /> },
];

export default function BrowseCategorySection({ categoriesLabel, title }: { categoriesLabel: string; title: string }) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Kategoriya cardlarini scroll qilish uchun
  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const onCategoryClick = (index: number) => {
    router.push(index === 0 ? "/shoes-products" : "/explore-products");
  };

  return (
    <section className="py-8 md:py-12 w-full bg-transparent">
      <div className="w-full max-w-6xl sm:px-4">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-2 md:gap-4 w-full">
          <div className="flex flex-col gap-1">
            {/* Title */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-4 rounded bg-red-500" />
              <span className="text-red-500 text-[15px] font-semibold">{categoriesLabel}</span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted/70 md:w-10 md:h-10 w-8 h-8 rounded-full"
              aria-label="Prev"
              onClick={() => scrollByCards("prev")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted/70 md:w-10 md:h-10 w-8 h-8 rounded-full"
              aria-label="Next"
              onClick={() => scrollByCards("next")}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* CATEGORY LIST */}
        <div
          ref={scrollerRef}
          className="
            mt-8 flex gap-4 w-full
            overflow-x-auto pb-2 scroll-smooth no-scrollbar"
        >
          {categories.map((cat, i) => (
            <Card
              key={cat.label}
              className={cn(
                `w-[170px] h-[150px] flex flex-col justify-center items-center gap-3 cursor-pointer transition
                 border-2 bg-white shadow-none min-w-[150px]
                 hover:bg-red-500 hover:text-white focus-visible:ring-red-500`,
                "border-red-500 text-red-500"
              )}
              tabIndex={0}
              onClick={() => onCategoryClick(i)}
            >
              <span className="transition-colors">
                {cat.icon}
              </span>
              <span
                className="mt-1 font-medium text-base transition-colors"
              >
                {cat.label}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}