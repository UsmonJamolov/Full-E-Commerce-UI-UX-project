"use client";

import { Heart, Eye, Star, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  ratingCount: number;
  isNew?: boolean;
  options?: string[];   // Rangi/variant uchun
  showCart?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    title: "Breed Dry Dog Food",
    price: 100,
    image: "/images/dog-food.png",
    rating: 4,
    ratingCount: 35,
  },
  {
    id: 2,
    title: "CANON EOS DSLR Camera",
    price: 360,
    image: "/images/canon-camera.png",
    rating: 5,
    ratingCount: 95,
    showCart: true,
  },
  {
    id: 3,
    title: "ASUS FHD Gaming Laptop",
    price: 700,
    image: "/images/asus-laptop.png",
    rating: 5,
    ratingCount: 325,
  },
  {
    id: 4,
    title: "Curology Product Set",
    price: 500,
    image: "/images/curology-set.png",
    rating: 4,
    ratingCount: 145,
  },
  {
    id: 5,
    title: "Kids Electric Car",
    price: 960,
    image: "/images/red-car.png",
    rating: 5,
    ratingCount: 65,
    isNew: true,
    options: ["#34eb54", "#ed2627"],
  },
  {
    id: 6,
    title: "Jr. Zoom Soccer Cleats",
    price: 1160,
    image: "/images/cleats.png",
    rating: 5,
    ratingCount: 35,
    options: ["#34eb54", "#ffd60b"],
  },
  {
    id: 7,
    title: "GP11 Shooter USB Gamepad",
    price: 660,
    image: "/images/gamepad.png",
    rating: 5,
    ratingCount: 55,
    isNew: true,
    options: ["#000", "#ed2627"],
  },
  {
    id: 8,
    title: "Quilted Satin Jacket",
    price: 660,
    image: "/images/jacket.png",
    rating: 5,
    ratingCount: 55,
    options: ["#000", "#ed2627"],
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < value ? "fill-amber-400 text-amber-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

export default function ExploreProductsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Gridni scroll qilish (agar kerak bo‘lsa)
  const scrollBy = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="relative -z-10 w-full py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex items-start justify-between gap-2 md:gap-4 w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-2 rounded bg-red-500" />
              <span className="text-red-500 text-[15px] font-semibold">
                Our Products
              </span>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Explore Our Products
            </h2>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted/70 md:w-10 md:h-10 w-8 h-8 rounded-full"
              aria-label="Prev"
              onClick={() => scrollBy("prev")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted/70 md:w-10 md:h-10 w-8 h-8 rounded-full"
              aria-label="Next"
              onClick={() => scrollBy("next")}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div
          ref={scrollerRef}
          className="
            mt-8 grid grid-cols-2 md:grid-cols-4 gap-5
            overflow-x-auto pb-2 scroll-smooth no-scrollbar
            "
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="relative p-0 group bg-[#f8f8f8] rounded-lg overflow-visible transition border-0 shadow-none"
            >
              {/* Action icons */}
              <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                <button
                  aria-label="Wishlist"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white hover:bg-gray-100 shadow ring-1 ring-black/5"
                  type="button"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  aria-label="Quick view"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white hover:bg-gray-100 shadow ring-1 ring-black/5"
                  type="button"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              {/* NEW Yozuvi */}
              {product.isNew ? (
                <div className="absolute left-3 top-3 bg-green-400 text-white text-xs px-3 py-[3px] rounded z-10">
                  NEW
                </div>
              ) : null}
              {/* IMAGE */}
              <div className="px-2 mt-3 flex items-center justify-center min-h-[130px] h-[130px] xs:h-[150px] md:h-[170px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={120}
                  height={100}
                  className="object-contain max-h-[130px] xs:max-h-[145px] md:max-h-[160px]"
                  unoptimized
                />
              </div>
              {/* CART KNOPKA */}
              {product.showCart && (
                <button className="block bg-black text-white py-2 rounded-md font-medium w-[87%] mx-auto mt-3 hover:bg-gray-800 transition text-sm">
                  Add To Cart
                </button>
              )}
              {/* INFO */}
              <div className="px-4 pt-2 pb-3 space-y-1">
                <p className="mt-2 mb-0 line-clamp-2 text-sm font-medium">{product.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-red-500">${product.price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Stars value={product.rating} />
                  <span className="ml-1 text-gray-500">
                    ({product.ratingCount})
                  </span>
                </div>
                {/* Color options */}
                {product.options && (
                  <div className="flex gap-2 mt-2">
                    {product.options.map((color) => (
                      <span
                        key={color}
                        style={{ background: color }}
                        className="inline-block w-4 h-4 rounded-full border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        {/* Bottom "View All Products" button */}
        <div className="flex justify-center mt-10">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 h-12 text-base rounded">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

