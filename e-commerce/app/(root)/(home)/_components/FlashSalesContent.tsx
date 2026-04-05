// app/(root)/home/_components/FlashSalesContent.tsx

'use client'; // Bu komponent KLIENT komponenti ekanligini bildiradi

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from "lucide-react"; // Star import qilingan, lekin ishlatilmagan bo'lsa, olib tashlash mumkin
import { SearchParams, IProduct } from '@/types'; // IProduct tipini import qiling
import ProductCard from "@/components/card/product.card";

// format2 funksiyasi o'zgarishsiz qoladi
function format2(n: number) { return String(n).padStart(2, "0"); }

// useCountdown hooki o'zgarishsiz qoladi
function useCountdown(target: Date) {
  const [ms, setMs] = React.useState(0);
  React.useEffect(() => {
   setMs(Math.max(0, target.getTime() - Date.now()));
   const t = setInterval(() => { setMs(Math.max(0, target.getTime() - Date.now())); }, 1000);
   return () => clearInterval(t);
 }, [target]);
  let totalSeconds = Math.floor(ms / 1000);
  let days = Math.floor((totalSeconds % (86400 * 30)) / 86400); // Agar oy ham kerak bo'lsa, days ni o'zgartirish kerak
  let hours = Math.floor((totalSeconds % 86400) / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

// Klient Komponentining propslari uchun interfeys
interface FlashSalesContentProps {
  products: IProduct[]; // Server Komponentidan keladigan mahsulotlar
  searchParams: SearchParams; // Kerak bo'lsa, searchParams ham qabul qilsin
}

// Klient komponenti async bo'lmaydi va prop'larni to'g'ridan-to'g'ri qabul qiladi
const FlashSalesContent: React.FC<FlashSalesContentProps> = ({ products, searchParams }) => {
    
  // Barcha hooklar endi Klient Komponenti ichida to'g'ri ishlaydi
  const target = React.useMemo(
    () => new Date(Date.now() + (3 * 86400 + 23 * 3600 + 19 * 60 + 56) * 1000), // Misol uchun, bu qiymat serverdan kelishi ham mumkin
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
          {products && products.map((product) => (
            // ProductCard propslarini ham to'g'rilash kerak bo'lishi mumkin
            <ProductCard key={product._id} product={product} />
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

export default FlashSalesContent;

/* ADD TO YOUR CSS (for complete scrollbar hiding in all browsers) */
/* 
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/ 