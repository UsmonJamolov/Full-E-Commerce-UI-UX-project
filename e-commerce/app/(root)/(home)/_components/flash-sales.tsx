"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { products } from "@/components/constants";

type Product = {
  id: string; title: string; image: string; discountPercent: number;
  price: number; oldPrice: number; rating: number; reviews: number; cta?: boolean;
};

function format2(n: number) { return String(n).padStart(2, "0"); }

function useCountdown(target: Date) {
  const [ms, setMs] = React.useState(0);
  React.useEffect(() => {
   setMs(Math.max(0, target.getTime() - Date.now())); // BOSHLANG'ICH QIYMAT
   const t = setInterval(() => { setMs(Math.max(0, target.getTime() - Date.now())); }, 1000);
   return () => clearInterval(t);
 }, [target]);
  let totalSeconds = Math.floor(ms / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor((totalSeconds % 86400) / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}


function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star key={i} className={cn("h-4 w-4", filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
        );
      })}
    </div>
  );
}

function FlashSalesSection() {
  const target = React.useMemo(
    () => new Date(Date.now() + (3 * 86400 + 23 * 3600 + 19 * 60 + 56) * 1000),
    []
  );
  const { days, hours, minutes, seconds } = useCountdown(target);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current; if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth", });
  };

  return (
    <section className="w-full py-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Header block and time */}
          <div className="flex gap-3 items-start md:gap-4">
            <div className="hidden xs:block mt-0.5 h-8 w-1 rounded bg-red-500 md:h-10 md:w-2" />
            <div>
              <div className="flex gap-2 items-center">
                <div className="h-7 w-4 rounded bg-red-500" />
                <p className="text-xs font-medium text-red-500 md:text-sm">Today’s</p>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Flash Sales</h2>
              <div className="mt-3 flex items-end gap-3 sm:gap-4 md:gap-6">
                <TimeBlock label="Days" value={format2(days)} />
                <Colon />
                <TimeBlock label="Hours" value={format2(hours)} />
                <Colon />
                <TimeBlock label="Minutes" value={format2(minutes)} />
                <Colon />
                <TimeBlock label="Seconds" value={format2(seconds)} />
              </div>
            </div>
          </div>
          {/* Arrow buttons */}
          <div className="flex items-center gap-1 pt-1 md:gap-2 md:pt-2 justify-end">
            <Button variant="ghost" size="icon" className="rounded-full bg-muted/60 w-8 h-8 md:w-10 md:h-10"
              onClick={() => scrollByCards("prev")} aria-label="Previous" >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-muted/60 w-8 h-8 md:w-10 md:h-10"
              onClick={() => scrollByCards("next")} aria-label="Next" >
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
        {/* Product scroller */}
        <div
          ref={scrollerRef}
          className="mt-5 flex gap-2 overflow-x-auto scroll-smooth pb-2 no-scrollbar sm:gap-4 md:mt-8"
        >
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="mt-6 flex justify-center md:mt-10">
          <Button className="h-11 rounded-md bg-red-500 px-8 text-base text-white hover:bg-red-600 md:h-12 md:px-10">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

function Colon() {
  return <span className="pb-1 text-xl font-semibold text-red-500 md:text-2xl">:</span>;
}
function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span className="text-[10px] text-muted-foreground md:text-xs">{label}</span>
      <span className="text-xl font-semibold md:text-3xl">{value}</span>
    </div>
  );
}

// === SHU YERdagi kodlarni yangiladik:
function ProductCard({ p }: { p: Product }) {
  return (
    <div className="relative -z-50 w-[170px] xs:w-[195px] sm:w-[230px] md:w-[260px] shrink-0">
      <Card className="border-0 shadow-none group">
        <div className="relative rounded-lg bg-muted/30 p-3 sm:p-4">
          <Badge className="absolute left-2 top-2 bg-red-500 text-white hover:bg-red-500 z-50 text-[11px] px-2 py-1 sm:left-3 sm:top-3">
            -{p.discountPercent}%
          </Badge>
          <div className="absolute right-2 top-2 flex flex-col gap-2 z-50 sm:right-3 sm:top-3">
            <IconBubble ariaLabel="Wishlist">
              <Heart className="h-4 w-4" />
            </IconBubble>
            <IconBubble ariaLabel="Quick view">
              <Eye className="h-4 w-4 z-50" />
            </IconBubble>
          </div>
          <div className="relative mx-auto aspect-square w-[110px] xs:w-[140px] sm:w-[180px]">
            <Image src={p.image} alt={p.title} fill className="object-contain" unoptimized />
          </div>
          {p.cta && (
            <Button
              asChild
              className="
                mt-4 w-full bg-black py-2 text-xs font-medium text-white
                rounded-none
                sm:py-3 sm:text-sm
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none group-hover:pointer-events-auto
                h-[6vh]
              "
            >
              <Link href={'/'}>
                Add To Cart
              </Link>
            </Button>
          )}
        </div>
        <div className="space-y-1 sm:space-y-2">
          <p className="line-clamp-2 text-xs font-medium sm:text-sm">{p.title}</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm font-semibold text-red-500">${p.price}</span>
            <span className="text-[12px] text-muted-foreground line-through">${p.oldPrice}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Stars value={p.rating} />
            <span className="text-[11px] text-muted-foreground">({p.reviews})</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function IconBubble({ children, ariaLabel, }: { children: React.ReactNode; ariaLabel: string; }) {
  return (
    <button
      aria-label={ariaLabel}
      className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-muted sm:h-9 sm:w-9"
      type="button"
    >
      {children}
    </button>
  );
}

export default FlashSalesSection

/* ADD TO YOUR CSS (for complete scrollbar hiding in all browsers) */
/* 
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/