"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  locale: _locale,
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
  const touchStartX = React.useRef<number | null>(null);

  // Auto slide - har 4 sekund
  React.useEffect(() => {
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % slideCount);
    }, 4000);
    return () => clearInterval(t);
  }, [slideCount]);

  // Dot bosilganda
  const goTo = (idx: number) => setCurrent(idx);
  const goPrev = () => setCurrent((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setCurrent((i) => (i + 1) % slideCount);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext();
    else goPrev();
  };
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
            relative z-0 h-[240px] w-full overflow-hidden rounded-md touch-pan-y
            xs:h-[270px] sm:h-[295px] md:h-[335px]
          "
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-zinc-950/55 text-white shadow-md backdrop-blur-sm transition hover:bg-zinc-950/75 md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-zinc-950/55 text-white shadow-md backdrop-blur-sm transition hover:bg-zinc-950/75 md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950 via-zinc-900 to-zinc-800" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.22),transparent_38%),radial-gradient(circle_at_45%_80%,rgba(16,185,129,0.18),transparent_45%)]" />
          <div className="absolute inset-0 z-[3]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 z-[4] bg-gradient-to-r from-zinc-950/75 via-zinc-950/35 to-zinc-950/15" />
          {/* Banner content */}
          <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-5 py-5 md:px-8 lg:px-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white">
                {slide.title}
              </span>
            </div>
            <div className="mb-4 xs:mb-5 md:mb-6">
              <span className="block text-[26px] xs:text-[32px] sm:text-[38px] md:text-[44px] leading-[1.12] font-bold text-white">
                {slide.text}
              </span>
            </div>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 text-base md:text-lg font-medium text-white underline underline-offset-8"
            >
              {ctaLabel} <ChevronRight className="h-5 w-5" />
            </Link>
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