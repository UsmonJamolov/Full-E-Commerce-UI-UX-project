'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/card/product-card";
import { IProduct, SearchParams } from "@/types";
import Link from "next/link";

interface Props {
  products: IProduct[]
  searchParams: SearchParams
  title: string
  noProducts: string
  viewAllLabel: string
}

const FlashSalesContent = ({ products, searchParams, title, noProducts, viewAllLabel }: Props) => {

  console.log('FlashSalesContent - ', products);
  console.log('FlashSalesContent - ', searchParams);
  
  
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.round(el.clientWidth * 0.9);

    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-xl sm:text-2xl md:text-4xl">{title}</h2>

          <div className="flex shrink-0 gap-2 self-end sm:self-auto">
            <Button type="button" size="icon" onClick={() => scrollByCards('prev')} aria-label="Previous">
              <ArrowLeft />
            </Button>
            <Button type="button" size="icon" onClick={() => scrollByCards('next')} aria-label="Next">
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Products */}
        <div ref={scrollerRef} className="mt-5 flex gap-4 overflow-x-auto no-scrollbar">
          {products.length === 0 && <p>{noProducts}</p>}

          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white px-8 h-12 text-base rounded">
            <Link href="/shoes-products">{viewAllLabel}</Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FlashSalesContent;