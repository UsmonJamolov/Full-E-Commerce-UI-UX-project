"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NEW_ARRIVAL_FALLBACK_CARDS,
  type PublicArrivalCard,
} from "@/lib/new-arrival-public";
import React from "react";

type Props = {
  initialCards: PublicArrivalCard[];
  shopNowLabel: string;
  featuredLabel: string;
  titleLabel: string;
};

export default function NewArrivalSection({ initialCards, shopNowLabel, featuredLabel, titleLabel }: Props) {
  const cards = initialCards?.length === 4 ? initialCards : NEW_ARRIVAL_FALLBACK_CARDS;

  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="h-7 w-4 rounded bg-red-500" />
            <span className="text-red-500 text-[15px] font-semibold">
              {featuredLabel}
            </span>
          </div>
          <h2 className="mt-4 mb-2 text-3xl md:text-4xl font-bold tracking-tight">
            {titleLabel}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-6 md:h-[510px]">
          <div className="relative overflow-hidden bg-black row-span-2 md:row-span-2 md:col-span-2 flex items-end min-h-[230px] md:min-h-0">
            <Image
              src={cards[0].image}
              alt={cards[0].title}
              fill
              className="object-contain object-center md:object-left-bottom pointer-events-none select-none z-0"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />
            <div className="relative z-20 px-6 pb-8 md:pb-12 pt-10">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{cards[0].title}</h3>
              <p className="text-gray-100/80 text-sm mb-4 max-w-sm">{cards[0].desc}</p>
              <Button
                asChild
                variant="outline"
                className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-5 mt-2"
              >
                <Link href="/contacts">{shopNowLabel}</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden bg-black flex min-h-[140px] items-end">
            <Image
              src={cards[1].image}
              alt={cards[1].title}
              fill
              className="object-contain object-right-top pointer-events-none select-none z-0"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
            <div className="relative z-20 px-5 pb-7 pt-8 w-full">
              <h3 className="text-white text-lg font-semibold mb-1">{cards[1].title}</h3>
              <p className="text-gray-100/80 text-sm mb-2">{cards[1].desc}</p>
              <Button
                asChild
                variant="outline"
                className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-4 py-1 h-9"
              >
                <Link href="/contacts">{shopNowLabel}</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative overflow-hidden bg-black flex items-end min-h-[120px]">
              <Image
                src={cards[2].image}
                alt={cards[2].title}
                fill
                className="object-contain object-center pointer-events-none select-none z-0"
                sizes="(max-width: 768px) 100vw, 200px"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
              <div className="relative z-20 px-4 pb-7 pt-6">
                <h3 className="text-white text-base font-semibold mb-1">{cards[2].title}</h3>
                <p className="text-gray-100/80 text-xs mb-2">{cards[2].desc}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-3 py-1 h-8 text-xs"
                >
                  <Link href="/contacts">{shopNowLabel}</Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden bg-black flex items-end min-h-[120px]">
              <Image
                src={cards[3].image}
                alt={cards[3].title}
                fill
                className="object-contain object-center pointer-events-none select-none z-0"
                sizes="(max-width: 768px) 100vw, 200px"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
              <div className="relative z-20 px-4 pb-7 pt-6">
                <h3 className="text-white text-base font-semibold mb-1">{cards[3].title}</h3>
                <p className="text-gray-100/80 text-xs mb-2">{cards[3].desc}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-3 py-1 h-8 text-xs"
                >
                  <Link href="/contacts">{shopNowLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
