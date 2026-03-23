// // import * as React from "react";
// // import { Button } from "@/components/ui/button";
// // import { ArrowLeft, ArrowRight, Star } from "lucide-react";
// // // import { products } from "@/components/constants";
// // import { SearchParams } from '@/types'
// // import { getProducts } from "@/actions/use.action";

// // // type Product = {
// // //   id: string; title: string; image: string; discountPercent: number;
// // //   price: number; oldPrice: number; rating: number; reviews: number; cta?: boolean;
// // // };

// // function format2(n: number) { return String(n).padStart(2, "0"); }

// // function useCountdown(target: Date) {
// //   const [ms, setMs] = React.useState(0);
// //   React.useEffect(() => {
// //    setMs(Math.max(0, target.getTime() - Date.now())); // BOSHLANG'ICH QIYMAT
// //    const t = setInterval(() => { setMs(Math.max(0, target.getTime() - Date.now())); }, 1000);
// //    return () => clearInterval(t);
// //  }, [target]);
// //   let totalSeconds = Math.floor(ms / 1000);
// //   let days = Math.floor(totalSeconds / 86400);
// //   let hours = Math.floor((totalSeconds % 86400) / 3600);
// //   let minutes = Math.floor((totalSeconds % 3600) / 60);
// //   let seconds = totalSeconds % 60;
// //   return { days, hours, minutes, seconds };
// // }

// // interface Props {
// // 	searchParams: SearchParams
// // }

// // const FlashSalesSection: React.FC<Props> = async props => {
// //   const searchParams = await props.searchParams
// //     const res = await getProducts({
// //       searchQuery: `${searchParams.q || ''}`,
// //       filter: `${searchParams.filter || ''}`,
// //       category: `${searchParams.category || ''}`,
// //       page: `${searchParams.page || '1'}`,
// //     })
  
// //     const products = res?.data?.products
  
// //   const target = React.useMemo(
// //     () => new Date(Date.now() + (3 * 86400 + 23 * 3600 + 19 * 60 + 56) * 1000),
// //     []
// //   );
// //   const { days, hours, minutes, seconds } = useCountdown(target);
// //   const scrollerRef = React.useRef<HTMLDivElement>(null);

// //   const scrollByCards = (dir: "prev" | "next") => {
// //     const el = scrollerRef.current; if (!el) return;
// //     const amount = Math.round(el.clientWidth * 0.9);
// //     el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth", });
// //   };

// //   return (
// //     <section className="w-full py-6 md:py-10">
// //       <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
// //         <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
// //           {/* Header block and time */}
// //           <div className="flex gap-3 items-start md:gap-4">
// //             <div className="hidden xs:block mt-0.5 h-8 w-1 rounded bg-red-500 md:h-10 md:w-2" />
// //             <div>
// //               <div className="flex gap-2 items-center">
// //                 <div className="h-7 w-4 rounded bg-red-500" />
// //                 <p className="text-xs font-medium text-red-500 md:text-sm">Today’s</p>
// //               </div>
// //               <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Flash Sales</h2>
// //               <div className="mt-3 flex items-end gap-3 sm:gap-4 md:gap-6">
// //                 <TimeBlock label="Days" value={format2(days)} />
// //                 <Colon />
// //                 <TimeBlock label="Hours" value={format2(hours)} />
// //                 <Colon />
// //                 <TimeBlock label="Minutes" value={format2(minutes)} />
// //                 <Colon />
// //                 <TimeBlock label="Seconds" value={format2(seconds)} />
// //               </div>
// //             </div>
// //           </div>
// //           {/* Arrow buttons */}
// //           <div className="flex items-center gap-1 pt-1 md:gap-2 md:pt-2 justify-end">
// //             <Button variant="ghost" size="icon" className="rounded-full bg-muted/60 w-8 h-8 md:w-10 md:h-10"
// //               onClick={() => scrollByCards("prev")} aria-label="Previous" >
// //               <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
// //             </Button>
// //             <Button variant="ghost" size="icon" className="rounded-full bg-muted/60 w-8 h-8 md:w-10 md:h-10"
// //               onClick={() => scrollByCards("next")} aria-label="Next" >
// //               <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
// //             </Button>
// //           </div>
// //         </div>
// //         {/* Product scroller */}
// //         <div
// //           ref={scrollerRef}
// //           className="mt-5 flex gap-2 overflow-x-auto scroll-smooth pb-2 no-scrollbar sm:gap-4 md:mt-8"
// //         >
// //           {products && products.map((product) => (
// //             // @ts-ignore
// //             <ProductCard key={product._id} product={product} />
// //           ))}
// //         </div>
// //         <div className="mt-6 flex justify-center md:mt-10">
// //           <Button className="h-11 rounded-md bg-red-500 px-8 text-base text-white hover:bg-red-600 md:h-12 md:px-10">
// //             View All Products
// //           </Button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // function Colon() {
// //   return <span className="pb-1 text-xl font-semibold text-red-500 md:text-2xl">:</span>;
// // }
// // function TimeBlock({ label, value }: { label: string; value: string }) {
// //   return (
// //     <div className="flex flex-col items-center min-w-[48px]">
// //       <span className="text-[10px] text-muted-foreground md:text-xs">{label}</span>
// //       <span className="text-xl font-semibold md:text-3xl">{value}</span>
// //     </div>
// //   );
// // }

// // export default FlashSalesSection

// // /* ADD TO YOUR CSS (for complete scrollbar hiding in all browsers) */
// // /* 
// // .no-scrollbar::-webkit-scrollbar { display: none; }
// // .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// // */

// // app/(root)/home/_components/flash-sales.tsx

// // 'use client' direktivasi bu yerda bo'lmaydi, chunki bu SERVER komponenti

// import { SearchParams, IProduct } from '@/types'; // Tiplarni import qiling
// import { getProducts } from "@/actions/user.action"; // Server Action
// import FlashSalesContent from "./FlashSalesContent"; // Yangi Klient Komponentini import qiling

// // Server Komponentining propslari
// interface FlashSalesSectionProps {
// 	searchParams: SearchParams;
// }
// export default async function FlashSalesSection({ searchParams: rowSearchParams }: FlashSalesSectionProps) {

//   const resolvedSearchParams = await rowSearchParams;
  
//   const res = await getProducts({
//     searchQuery: `${resolvedSearchParams.q || ''}`,
//     filter: `${resolvedSearchParams.filter || ''}`,
//     category: `${resolvedSearchParams.category || ''}`,
//     page: `${resolvedSearchParams.page || '1'}`,
//   });

//   const products = res?.data?.products || []

//   // console.log(res);
//   console.log(res);
  
  

//   return (
//     <FlashSalesContent products={products} searchParams={resolvedSearchParams} />
//   );
// }

// app/(root)/home/_components/flash-sales.tsx

// 'use client' direktivasi bu yerda bo'lmaydi, chunki bu SERVER komponenti

// import { SearchParams, IProduct, GetProductsActionReturnType } from '@/types'; // GetProductsActionReturnType ni import qiling
// import { getProducts } from "@/actions/user.action"; // Server Action (user.action deb o'zgartirdim, agar to'g'ri bo'lsa)
// import FlashSalesContent from "./FlashSalesContent"; // Yangi Klient Komponentini import qiling

// // Server Komponentining propslari
// interface FlashSalesSectionProps {
// 	searchParams: SearchParams;
// }

// export default async function FlashSalesSection({ searchParams: rawSearchParams }: FlashSalesSectionProps) {
//   const resolvedSearchParams = await rawSearchParams;
  
//   // `res` ning tipini GetProductsActionReturnType | undefined deb aniqlaymiz
//   const res: GetProductsActionReturnType | undefined = await getProducts({
//     searchQuery: `${resolvedSearchParams.q || ''}`,
//     filter: `${resolvedSearchParams.filter || ''}`,
//     category: `${resolvedSearchParams.category || ''}`,
//     page: `${resolvedSearchParams.page || '1'}`,
//   });

//   // Xatoni tuzatish: `res?.data` dan to'g'ridan-to'g'ri mahsulotlar massivini oling
//   // Chunki `GetProductsActionReturnType` ichida mahsulotlar `data` kaliti ostida,
//   // va `data` ning o'zi `IProduct[]` turidagi massivdir.
//   const products: IProduct[] = res?.data || []; 
  
//   // console.log(res); // API javobining to'liq tuzilishini ko'rsatadi
//   console.log("Extracted Products:", products); // Endi bu yerda mahsulotlar massivi ko'rinishi kerak
  
//   return (
//     <FlashSalesContent products={products} searchParams={resolvedSearchParams} />
//   );
// }

// app/(root)/home/_components/flash-sales.tsx

// ... importlar ...
// SafeActionResult tipini safe-action dan import qilishimiz kerak
// app/(root)/home/_components/flash-sales.tsx

// 'use client' direktivasi bu yerda bo'lmaydi, chunki bu SERVER komponenti

import { IProduct, SearchParams } from "@/types";
import { getProducts } from "@/actions/user.action";
import FlashSalesContent from "./FlashSalesContent";

interface FlashSalesSectionProps {
  searchParams: SearchParams;
}

export default async function FlashSalesSection({
  searchParams: rawSearchParams,
}: FlashSalesSectionProps) {
  const resolvedSearchParams = await rawSearchParams;

  const res = await getProducts({
  searchQuery: `${resolvedSearchParams.q || ""}`,
  filter: `${resolvedSearchParams.filter || ""}`,
  category: `${resolvedSearchParams.category || ""}`,
  page: `${resolvedSearchParams.page || "1"}`,
});

console.log('lekin res da data kelyabdi', res);


if (!res) {
  return <div>Xatolik: response yo‘q</div>;
}

if (res.serverError) {
  return <div>Serverda xatolik</div>;
}

if (res.validationErrors) {
  return <div>So‘rov noto‘g‘ri</div>;
}

// 🔥 MUHIM JOY
const products: IProduct[] = res?.data?.data || [];

console.log('const products: IProduct[] = res.data?.data || []; bush Array qaytardi', products);


  return (
    <FlashSalesContent
      products={products}
      searchParams={resolvedSearchParams}
    />
  );
}