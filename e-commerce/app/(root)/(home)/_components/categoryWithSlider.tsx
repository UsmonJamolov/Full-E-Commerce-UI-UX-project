// "use client";

// import { ChevronRight } from "lucide-react";
// import Image from "next/image";

// const categories: string[] = [
//   "Woman’s Fashion",
//   "Men’s Fashion",
//   "Electronics",
//   "Home & Lifestyle",
//   "Medicine",
//   "Sports & Outdoor",
//   "Baby’s & Toys",
//   "Groceries & Pets",
//   "Health & Beauty",
// ];

// export function CategoryWithSlider() {
//   return (
//     <section className="w-full max-w-screen-xl flex gap-0">
//       {/* Categories */}
//       <div
//         className="w-[250px] border-r pt-6"
//         style={{
//           minHeight: 360,
//           borderColor: "#E5E7EB", // border-gray-200 (tailwind)
//         }}
//       >
//         <nav>
//           {categories.map((cat, i) => (
//             <div
//               key={cat}
//               className={[
//                 "flex items-center justify-between px-6 py-[7px] text-[16px] cursor-pointer transition-colors",
//                 "hover:bg-gray-50",
//               ].join(" ")}
//             >
//               <span>{cat}</span>
//               {i <= 1 && (
//                 <ChevronRight className="h-5 w-5 text-zinc-400" />
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//       {/* Banner slider */}
//       <div className="flex-1 flex flex-col pl-8 pt-6">
//         <div
//           className="relative flex items-center bg-black h-[335px] w-full mt-0 -z-50"
//         //   style={{ borderRadius: "21px" }}
//         >
//           <div className="flex flex-1 flex-col justify-center pl-12 z-10">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-3xl"></span>
//               <span className="text-base font-semibold text-white">
//                 iPhone 14 Series
//               </span>
//             </div>
//             <div className="mb-7">
//               <span className="text-[44px] leading-[1.1] font-bold text-white">
//                 Up to 10% <br /> off Voucher
//               </span>
//             </div>
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 text-base font-normal text-white underline underline-offset-8"
//             >
//               Shop Now <ChevronRight className="h-5 w-5" />
//             </a>
//           </div>
//           <div className="flex-1 flex items-end justify-end pr-10 pb-2">
//             <Image
//               src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-storage-select-202209-6-1inch_AV1_GEO_CN?wid=512&hei=512&fmt=png-alpha&.v=1660803979504"
//               alt="iPhone 14"
//               width={300}
//               height={300}
//               className="object-contain"
//               priority
//               unoptimized
//             />
//           </div>
//           {/* Slider dots */}
//           <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-3 z-20">
//             {[0, 1, 2, 3].map((i) => (
//               <span
//                 key={i}
//                 className={`inline-block w-4 h-4 rounded-full border-2 transition
//                   ${i === 2 ? "bg-red-600 border-red-600" : "bg-white border-gray-300"}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CategoryWithSlider;

"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

const categories: string[] = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export function CategoryWithSlider() {
  return (
    <section className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 px-2 sm:px-4">
      {/* Categories - responsiv */}
      <div
        className="
          w-full 
          md:w-[250px] 
          border-b md:border-b-0 md:border-r
          pt-2 md:pt-6
          md:min-h-[360px]
          bg-white
        "
        style={{
          borderColor: "#E5E7EB",
        }}
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
      {/* Banner slider */}
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
          {/* Content */}
          <div className="flex-1 flex flex-col justify-center items-start md:pl-12 pl-5 py-5 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl xs:text-3xl text-white"></span>
              <span className="text-xs xs:text-sm md:text-base font-semibold text-white">
                iPhone 16 Series
              </span>
            </div>
            <div className="mb-5 xs:mb-6">
              <span className="block text-2xl xs:text-[30px] sm:text-[36px] md:text-[44px] leading-[1.1] font-bold text-white">
                Up to 10% <br /> off Voucher
              </span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm md:text-base font-normal text-white underline underline-offset-8"
            >
              Shop Now <ChevronRight className="h-5 w-5" />
            </a>
          </div>
          {/* Image */}
          <div className="flex-1 w-full flex items-end justify-end md:pr-10 md:pb-2 pr-3 pb-2 min-w-[140px] md:min-w-[240px]">
            <Image
              src="/images/iphone-promo.png"
              alt="iPhone 16"
              width={190}
              height={180}
              className="object-contain w-[110px] xs:w-[130px] sm:w-[170px] md:w-[250px] h-auto"
              priority
              unoptimized
            />
          </div>
          {/* Slider dots */}
          <div className="absolute left-1/2 bottom-3 xs:bottom-4 md:bottom-6 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full border transition
                  ${i === 2 ? "bg-red-600 border-red-600" : "bg-white border-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryWithSlider;