"use client";

import {
  Footprints,
  Shirt,
  Umbrella,
  Handbag,
  Backpack,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/dictionaries";

type Category = {
  label: string;
  icon: React.ReactNode;
};
type CategoryKey = "shoes" | "tshirts" | "jackets" | "umbrellas" | "bags" | "backpacks";

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

const categoryLabelsByLocale: Record<Locale, Record<CategoryKey, string>> = {
  en: {
    shoes: "Footwear",
    tshirts: "T-shirts",
    jackets: "Jackets",
    umbrellas: "Umbrellas",
    bags: "Bags",
    backpacks: "Backpacks",
  },
  ru: {
    shoes: "Обувь",
    tshirts: "Футболки",
    jackets: "Куртки",
    umbrellas: "Зонты",
    bags: "Сумки",
    backpacks: "Рюкзаки",
  },
  uz: {
    shoes: "Oyoq kiyim",
    tshirts: "Futbolka",
    jackets: "Kurtka",
    umbrellas: "Soyabon",
    bags: "Sumka",
    backpacks: "Ryukzak",
  },
};

export default function BrowseCategorySection({
  categoriesLabel,
  title,
  locale,
}: {
  categoriesLabel: string;
  title: string;
  locale: Locale;
}) {
  const router = useRouter();
  const labels = categoryLabelsByLocale[locale];
  const categories: Category[] = [
    { label: labels.shoes, icon: <Footprints size={40} /> },
    { label: labels.tshirts, icon: <Shirt size={40} /> },
    { label: labels.jackets, icon: <JacketIcon /> },
    { label: labels.umbrellas, icon: <Umbrella size={40} /> },
    { label: labels.bags, icon: <Handbag size={40} /> },
    { label: labels.backpacks, icon: <Backpack size={40} /> },
  ];

  const onCategoryClick = (index: number) => {
    router.push(index === 0 ? "/shoes-products" : "/explore-products");
  };

  return (
    <section className="py-8 md:py-12 w-full bg-transparent">
      <div className="w-full max-w-6xl sm:px-4">
        {/* HEADER */}
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-4 rounded bg-red-500" />
              <span className="text-red-500 text-[15px] font-semibold">{categoriesLabel}</span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
        </div>
        {/* CATEGORY LIST */}
        <div
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