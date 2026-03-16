// "use client";

// import Image from "next/image";
// import { Truck, Headphones, Undo2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import React from "react";

// const featured = [
//   {
//     id: 1,
//     title: "PlayStation 5",
//     desc: "Black and White version of the PS5 coming out on sale.",
//     image: "/images/ps5.png",
//     big: true,
//   },
//   {
//     id: 2,
//     title: "Women’s Collections",
//     desc: "Featured woman collections that give you another vibe.",
//     image: "/images/woman-collection.png",
//     big: false,
//   },
//   {
//     id: 3,
//     title: "Speakers",
//     desc: "Amazon wireless speakers",
//     image: "/images/amazon-echo.png",
//     big: false,
//   },
//   {
//     id: 4,
//     title: "Perfume",
//     desc: "GUCCI INTENSE OUD EDP",
//     image: "/images/gucci-perfume.png",
//     big: false,
//   },
// ];

// export default function NewArrivalSection() {
//   return (
//     <section className="w-full py-8 md:py-12">
//       <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
//         {/* HEADER */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2">
//             <div className="h-7 w-4 rounded bg-red-500" />
//             <span className="text-red-500 text-[15px] font-semibold">
//               Featured
//             </span>
//           </div>
//           <h2 className="mt-4 mb-2 text-3xl md:text-4xl font-bold tracking-tight">
//             New Arrival
//           </h2>
//         </div>
//         {/* FEATURED GRID */}
//         <div
//           className="
//             grid grid-cols-1 md:grid-cols-2 gap-5
//             "
//         >
//           {/* LEFT Big Card */}
//           <FeaturedCard {...featured[0]} />
//           {/* RIGHT Small grid */}
//           <div className="grid grid-cols-1 md:grid-cols-1 grid-rows-2 md:grid-rows-3 gap-5">
//             <FeaturedCard {...featured[1]} small />
//             <div className="grid grid-cols-2 gap-5">
//               <FeaturedCard {...featured[2]} smallest />
//               <FeaturedCard {...featured[3]} smallest />
//             </div>
//           </div>
//         </div>
//         {/* FOOTER ICONS (Info) */}
//         <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-between items-center mt-16">
//           <FeatureIcon
//             icon={<Truck className="w-8 h-8 mb-2" />}
//             title="FREE AND FAST DELIVERY"
//             desc="Free delivery for all orders over $140"
//           />
//           <FeatureIcon
//             icon={<Headphones className="w-8 h-8 mb-2" />}
//             title="24/7 CUSTOMER SERVICE"
//             desc="Friendly 24/7 customer support"
//           />
//           <FeatureIcon
//             icon={<Undo2 className="w-8 h-8 mb-2" />}
//             title="MONEY BACK GUARANTEE"
//             desc="We return money within 30 days"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// // CARD VARIANTLARI
// type FeaturedCardProps = {
//   title: string;
//   desc: string;
//   image: string;
//   big?: boolean;
//   small?: boolean;
//   smallest?: boolean;
// };

// const FeaturedCard: React.FC<FeaturedCardProps> = ({
//   title,
//   desc,
//   image,
//   big,
//   small,
//   smallest,
// }) => {
//   // Card sizes
//   let cardClass =
//     "rounded-lg overflow-hidden relative flex flex-col justify-end min-h-[180px] bg-black";
//   if (big)
//     cardClass +=
//       " md:min-h-[390px] h-[250px] md:h-auto col-span-1 shadow-lg";
//   if (small) cardClass += " md:min-h-[185px] h-[180px] shadow-md";
//   if (smallest) cardClass += " md:min-h-[175px] h-[140px] shadow";
//   return (
//     <div className={cardClass}>
//       {/* Image */}
//       <Image
//         src={image}
//         alt={title}
//         width={big ? 360 : 210}
//         height={big ? 230 : 135}
//         className={`
//           absolute right-0 bottom-0 z-0
//           object-contain
//           ${smallest ? "h-full max-h-[100px] w-auto" : ""}
//         `}
//         unoptimized
//         priority
//       />
//       {/* Overlay */}
//       <div
//         className={`
//           absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent
//           ${big ? "" : "rounded-lg"}
//         `}
//       />
//       {/* Text */}
//       <div className="relative z-20 px-6 pb-7 pt-10">
//         <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">
//           {title}
//         </h3>
//         <p className="text-white/80 text-sm mb-4">{desc}</p>
//         <Button
//           variant="outline"
//           className="border-white bg-white/20 text-white hover:bg-white hover:text-black py-2 px-4 rounded shadow"
//         >
//           Shop Now
//         </Button>
//       </div>
//     </div>
//   );
// };

// type FeatureIconProps = {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
// };
// function FeatureIcon({ icon, title, desc }: FeatureIconProps) {
//   return (
//     <div className="flex flex-col items-center text-center w-full sm:w-1/3">
//       <div className="rounded-full border border-gray-300 p-4 mb-3 bg-white">
//         {icon}
//       </div>
//       <div className="font-semibold text-base">{title}</div>
//       <div className="text-gray-500 text-sm mt-1">{desc}</div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

const featured = [
  {
    id: 1,
    title: "PlayStation 5",
    desc: "Black and White version of the PS5 coming out on sale.",
    image: "/images/ps5.png",
    big: true,
  },
  {
    id: 2,
    title: "Women’s Collections",
    desc: "Featured woman collections that give you another vibe.",
    image: "/images/woman-collection.png",
  },
  {
    id: 3,
    title: "Speakers",
    desc: "Amazon wireless speakers",
    image: "/images/amazon-echo.png",
  },
  {
    id: 4,
    title: "Perfume",
    desc: "GUCCI INTENSE OUD EDP",
    image: "/images/gucci-perfume.png",
  },
];

export default function NewArrivalSection() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="h-7 w-4 rounded bg-red-500" />
            <span className="text-red-500 text-[15px] font-semibold">
              Featured
            </span>
          </div>
          <h2 className="mt-4 mb-2 text-3xl md:text-4xl font-bold tracking-tight">
            New Arrival
          </h2>
        </div>
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-6 md:h-[510px]">
          {/* BIG LEFT CARD */}
          <div className="relative overflow-hidden bg-black row-span-2 md:row-span-2 md:col-span-2 flex items-end min-h-[230px] md:min-h-0">
            <Image
              src={featured[0].image}
              alt={featured[0].title}
              fill
              className="object-contain object-center md:object-left-bottom pointer-events-none select-none z-0"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />
            <div className="relative z-20 px-6 pb-8 md:pb-12 pt-10">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{featured[0].title}</h3>
              <p className="text-gray-100/80 text-sm mb-4 max-w-sm">{featured[0].desc}</p>
              <Button
                variant="outline"
                className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-5 mt-2"
              >
                Shop Now
              </Button>
            </div>
          </div>
          {/* TOP RIGHT */}
          <div className="relative overflow-hidden bg-black flex min-h-[140px] items-end">
            <Image
              src={featured[1].image}
              alt={featured[1].title}
              fill
              className="object-contain object-right-top pointer-events-none select-none z-0"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
            <div className="relative z-20 px-5 pb-7 pt-8 w-full">
              <h3 className="text-white text-lg font-semibold mb-1">{featured[1].title}</h3>
              <p className="text-gray-100/80 text-sm mb-2">{featured[1].desc}</p>
              <Button
                variant="outline"
                className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-4 py-1 h-9"
              >
                Shop Now
              </Button>
            </div>
          </div>
          {/* BOTTOM RIGHT */}
          <div className="grid grid-cols-2 gap-6">
            {/* Speakers */}
            <div className="relative overflow-hidden bg-black flex items-end min-h-[120px]">
              <Image
                src={featured[2].image}
                alt={featured[2].title}
                fill
                className="object-contain object-center pointer-events-none select-none z-0"
                sizes="(max-width: 768px) 100vw, 200px"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
              <div className="relative z-20 px-4 pb-7 pt-6">
                <h3 className="text-white text-base font-semibold mb-1">{featured[2].title}</h3>
                <p className="text-gray-100/80 text-xs mb-2">{featured[2].desc}</p>
                <Button
                  variant="outline"
                  className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-3 py-1 h-8 text-xs"
                >
                  Shop Now
                </Button>
              </div>
            </div>
            {/* Perfume */}
            <div className="relative overflow-hidden bg-black flex items-end min-h-[120px]">
              <Image
                src={featured[3].image}
                alt={featured[3].title}
                fill
                className="object-contain object-center pointer-events-none select-none z-0"
                sizes="(max-width: 768px) 100vw, 200px"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
              <div className="relative z-20 px-4 pb-7 pt-6">
                <h3 className="text-white text-base font-semibold mb-1">{featured[3].title}</h3>
                <p className="text-gray-100/80 text-xs mb-2">{featured[3].desc}</p>
                <Button
                  variant="outline"
                  className="border-white bg-white/15 text-white hover:bg-white hover:text-black px-3 py-1 h-8 text-xs"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}