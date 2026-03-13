"use client";

import {
  Eye,
  Heart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

// 1. Type yozamiz
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
};

// 2. Productlar massivini hosil qilamiz
const products: Product[] = [
  {
    id: 1,
    title: "The north coat",
    image: "/images/kurtka.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
  },
  {
    id: 2,
    title: "Gucci duffle bag",
    image: "/images/sumka.png",
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 65,
  },
  {
    id: 3,
    title: "RGB liquid CPU Cooler",
    image: "/images/shim1.png",
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
  },
  {
    id: 4,
    title: "Small BookSelf",
    image: "/images/shim2.png",
    price: 360,
    rating: 4.5,
    reviews: 65,
  },
];

function Stars({ value }: { value: number }) {
  const total = 5;
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
            )}
          />
        );
      })}
    </div>
  );
}

export default function BestSellingProductsSection() {
  return (
    <section className="py-8 md:py-12 w-full bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-2 md:gap-4 w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-4 rounded bg-red-500" />
              <span className="text-red-500 text-[15px] font-semibold">
                This Month
              </span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Best Selling Products
            </h2>
          </div>
          <Button className="h-11 rounded-md bg-red-500 px-7 text-base text-white hover:bg-red-600 md:h-12 md:px-8">
            View All
          </Button>
        </div>
        {/* PRODUCTS LIST */}
        <div
          className="
            mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full
          "
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="group border-0 shadow-none transition bg-white p-0 relative -z-10" 
            >
              {/* Action icons */}
                <div className="absolute right-4 top-4 flex flex-col gap-3 z-10">
                <button
                  aria-label="Wishlist"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 hover:bg-muted"
                  type="button"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  aria-label="Quick view"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 hover:bg-muted"
                  type="button"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              {/* Product image */}
              <div className="relative flex justify-center items-center h-[170px] md:h-[150px] overflow-hidden pt-7 pb-3">
                {/* Next.js <Image /> ishlatmoqchi bo‘lsangiz import Image from next/image; */}
                <Image src={product.image} alt={product.title} fill className="object-contain" unoptimized />
              </div>
              {/* Info */}
              <div className="px-4 py-2 space-y-1">
                <p className="mt-2 line-clamp-2 text-sm font-medium">{product.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-red-500">${product.price}</span>
                  {product.oldPrice ? (
                    <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
                  ) : null}
                </div>
                <div className="flex items-center gap-1">
                  <Stars value={product.rating} />
                  <span className="text-[10px] text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}