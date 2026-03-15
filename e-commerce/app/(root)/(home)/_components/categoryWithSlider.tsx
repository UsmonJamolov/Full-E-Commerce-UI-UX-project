"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { categories, slides } from "@/components/constants";

// Slider asl komponenti
export default function CategoryWithSlider() {
  const [current, setCurrent] = React.useState(0);

  // Auto slide - har 4 sekund
  React.useEffect(() => {
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Sliderda chap/ongga bosish
  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent((i) => (i + 1) % slides.length);

  // Dot bosilganda
  const goTo = (idx: number) => setCurrent(idx);

  return (
    <section className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 px-2 sm:px-4">
      {/* Categories */}
      <div
        className="
          w-full 
          md:w-[250px] 
          border-b md:border-b-0 md:border-r
          pt-2 md:pt-6
          md:min-h-[360px]
          bg-white
        "
        style={{ borderColor: "#E5E7EB" }}
      >
        <nav className="flex md:block overflow-x-auto md:overflow-visible">
          {categories.map((cat, i) => (
            <div
              key={cat}
              className={[
                "flex items-center justify-between min-w-[150px] md:min-w-0 px-4 md:px-6 py-3 md:py-[7px] text-[15px] md:text-[16px] cursor-pointer whitespace-nowrap",
                "transition-colors hover:bg-gray-50",
              ].join(" ")}
            >
              <span>{cat}</span>
              {i <= 1 && (
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* Slider */}
      <div className="flex-1 flex flex-col md:pl-8 pt-2 md:pt-6">
        <div
          className="
            relative flex flex-col md:flex-row items-center
            -z-50
            bg-black
            h-[240px] xs:h-[270px] sm:h-[295px] md:h-[335px] w-full mt-0 
            overflow-hidden
          "
        >
          {/* Banner content */}
          <div className="flex-1 flex flex-col justify-center items-start md:pl-12 pl-5 py-5 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs xs:text-sm md:text-base font-semibold text-white">
                {slides[current].title}
              </span>
            </div>
            <div className="mb-5 xs:mb-6">
              <span className="block text-2xl xs:text-[30px] sm:text-[36px] md:text-[44px] leading-[1.1] font-bold text-white">
                {slides[current].text}
              </span>
            </div>
            <a
              href={slides[current].link}
              className="inline-flex items-center gap-2 text-sm md:text-base font-normal text-white underline underline-offset-8"
            >
              Купить сейчас <ChevronRight className="h-5 w-5" />
            </a>
          </div>
          {/* Banner image */}
          <div className="flex-1 w-full flex items-end justify-end md:pr-10 md:pb-2 pr-3 pb-2 min-w-[140px] md:min-w-[240px]">
            <Image
              src={slides[current].image}
              alt={slides[current].alt}
              width={190}
              height={180}
              className="object-contain w-[110px] xs:w-[130px] sm:w-[170px] md:w-[250px] h-auto"
              priority
              unoptimized
            />
          </div>
          {/* Slider dots */}
          <div className="absolute left-1/2 bottom-3 xs:bottom-4 md:bottom-6 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
            {slides.map((_, idx) => (
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