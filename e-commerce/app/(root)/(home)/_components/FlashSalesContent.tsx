'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/card/product.card";
import { IProduct, SearchParams } from "@/types";
import Link from "next/link";

interface Props {
  products: IProduct[]
  searchParams: SearchParams
}

const FlashSalesContent = ({ products, searchParams }: Props) => {

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
        <div className="flex justify-between">
          <h2 className="text-2xl md:text-4xl">Erkaklar oyoq kiyimi</h2>

          <div className="flex gap-2">
            <Button onClick={() => scrollByCards("prev")}>
              <ArrowLeft />
            </Button>
            <Button onClick={() => scrollByCards("next")}>
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Products */}
        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto mt-5">
          {products.length === 0 && <p>No products</p>}

          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white px-8 h-12 text-base rounded">
            <Link href="/shoes-products">View All Products</Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FlashSalesContent;