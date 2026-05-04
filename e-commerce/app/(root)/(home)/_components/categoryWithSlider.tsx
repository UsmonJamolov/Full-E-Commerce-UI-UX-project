"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HomeSliderSlide, Locale } from "@/lib/i18n/dictionaries";

// Slider asl komponenti
const defaultHrefs = [
  '/women-products',
  '/men-products',
  '/children-products',
  '/umbrellas-products',
  '/bags-products',
  '/backpacks-products',
  '/clothes-products',
]

export default function CategoryWithSlider({
  locale,
  ctaLabel,
  sliderSlides,
  sidebarCategories,
  sidebarCategoryHrefs,
}: {
  locale: Locale
  ctaLabel: string
  sliderSlides: HomeSliderSlide[]
  sidebarCategories: string[]
  sidebarCategoryHrefs: string[]
}) {
  const [current, setCurrent] = React.useState(0);
  const slideCount = sliderSlides.length || 1;
  const slide = sliderSlides[Math.min(current, slideCount - 1)] ?? sliderSlides[0];

  // Auto slide - har 4 sekund
  React.useEffect(() => {
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % slideCount);
    }, 4000);
    return () => clearInterval(t);
  }, [slideCount]);

  // Dot bosilganda
  const goTo = (idx: number) => setCurrent(idx);
  const localizedCategories = React.useMemo(
    () =>
      sidebarCategories.length > 0
        ? sidebarCategories
        : ["Women's fashion", "Men's fashion", "Children's fashion", 'Umbrellas', 'Bags', 'Backpacks', 'Clothes'],
    [sidebarCategories],
  )

  const hrefs = React.useMemo(() => {
    if (sidebarCategoryHrefs.length === localizedCategories.length) return sidebarCategoryHrefs
    return localizedCategories.map((_, i) => defaultHrefs[i] ?? '/explore-products')
  }, [sidebarCategoryHrefs, localizedCategories.length])

  const rowClass =
    'flex items-center justify-between min-w-[150px] md:min-w-0 px-4 md:px-6 py-3 md:py-[7px] text-[15px] md:text-[16px] whitespace-nowrap transition-colors hover:bg-gray-50'

  return (
    <section className="flex w-full min-w-0 flex-col md:flex-row md:items-stretch md:gap-0">
      {/* Categories */}
      <div
        className="
          w-full 
          shrink-0
          md:w-[250px] 
          border-b md:border-b-0 md:border-r
          pt-2 md:pt-6
          md:min-h-[360px]
          bg-white
        "
        style={{ borderColor: "#E5E7EB" }}
      >
        <nav className="flex md:block overflow-x-auto md:overflow-visible">
          {localizedCategories.map((cat, i) => (
            <Link
              key={`${i}-${cat}`}
              href={hrefs[i] ?? '/explore-products'}
              className={[rowClass, 'cursor-pointer text-inherit no-underline'].join(' ')}
            >
              <span>{cat}</span>
              {i <= 1 && (
                <ChevronRight className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
              )}
            </Link>
          ))}
        </nav>
      </div>
      {/* Slider */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col pt-2 md:pt-6 md:pl-4 lg:pl-6">
        <div
          className="
            relative z-0 flex h-[240px] w-full flex-col bg-black overflow-hidden
            xs:h-[270px] sm:h-[295px] md:h-[335px] md:flex-row md:items-stretch
          "
        >
          {/* Banner content */}
          <div className="z-10 flex flex-1 flex-col items-start justify-center py-5 pl-5 md:pl-8 lg:pl-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs xs:text-sm md:text-base font-semibold text-white">
                {slide.title}
              </span>
            </div>
            <div className="mb-5 xs:mb-6">
              <span className="block text-2xl xs:text-[30px] sm:text-[36px] md:text-[44px] leading-[1.1] font-bold text-white">
                {slide.text}
              </span>
            </div>
            <Link
              href={slide.link}
              className="inline-flex items-center gap-2 text-sm md:text-base font-normal text-white underline underline-offset-8"
            >
              {ctaLabel} <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          {/* Banner image */}
          <div className="flex min-w-[140px] flex-1 items-end justify-end pb-2 pr-3 md:min-w-[200px] md:pb-2 md:pr-8 lg:pr-10">
            <Image
              src={slide.image}
              alt={slide.alt}
              width={190}
              height={180}
              className="object-contain w-[110px] xs:w-[130px] sm:w-[170px] md:w-[250px] h-auto"
              priority
              unoptimized
            />
          </div>
          {/* Slider dots */}
          <div className="absolute left-1/2 bottom-3 xs:bottom-4 md:bottom-6 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
            {sliderSlides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={[
                  "inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full border transition",
                  idx === current
                    ? "bg-red-600 border-red-600"
                    : "bg-white border-gray-300",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}