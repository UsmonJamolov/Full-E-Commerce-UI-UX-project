"use client";

import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Monitor,
  Watch,
  Camera as CameraIcon,
  Headphones,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Category = {
  label: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { label: "Phones", icon: <Smartphone size={40} /> },
  { label: "Computers", icon: <Monitor size={40} /> },
  { label: "SmartWatch", icon: <Watch size={40} /> },
  { label: "Camera", icon: <CameraIcon size={40} /> },
  { label: "HeadPhones", icon: <Headphones size={40} /> },
  { label: "Gaming", icon: <Gamepad2 size={40} /> },
];

export default function BrowseCategorySection() {
  const [selected, setSelected] = React.useState<number>(3); // default Camera
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  // Kategoriya cardlarini scroll qilish uchun
  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
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
              <span className="text-red-500 text-[15px] font-semibold">Categories</span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Browse By Category</h2>
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
                 hover:border-red-400 focus-visible:ring-red-500`,
                selected === i
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-gray-200 text-black"
              )}
              tabIndex={0}
              onClick={() => setSelected(i)}
            >
              <span className={cn("transition", selected === i ? "text-white" : "text-black")}>
                {cat.icon}
              </span>
              <span
                className={cn(
                  "mt-1 font-medium text-base transition",
                  selected === i ? "text-white" : "text-black"
                )}
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