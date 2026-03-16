// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useEffect } from "react";

// // Timer Hook
// function useCountdown(target: Date) {
//     const [ms, setMs] = React.useState(() => Math.max(0, target.getTime() - Date.now()));
//     React.useEffect(() => {
//         const t = setInterval(() => setMs(Math.max(0, target.getTime() - Date.now())), 1000);
//         return () => clearInterval(t);
//     }, [target]);
//     const totalSeconds = Math.floor(ms / 1000);
//     const days = Math.floor(totalSeconds / 86400);
//     const hours = Math.floor((totalSeconds % 86400) / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return { days, hours, minutes, seconds };
// }

// export default function MusicBannerSection() {
//     // Timer to random 5 days ahead
//     const target = React.useMemo(
//         () => new Date(Date.now() + (5 * 86400 + 23 * 3600 + 59 * 60 + 35) * 1000),
//         []
//   );
//   const { days, hours, minutes, seconds } = useCountdown(target);

//   return (
//     <section className="w-full flex justify-center items-center py-8 md:py-12 mt-10 relative -z-10">
//       <div className="
//         w-full max-w-6xl 
//         aspect-[2.1/1]
//         bg-black
//         flex flex-col md:flex-row
//         relative overflow-hidden
//         items-stretch
//       ">
//         {/* LEFT CONTENT */}
//         <div className="
//           flex-1 flex flex-col justify-center px-6 md:px-14 
//           py-10 gap-8 z-10
//         ">
//           <span className="text-green-400 text-[17px] font-semibold mb-2">
//             Categories
//           </span>
//           <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-[24ch] select-none">
//             Enhance Your <br /> Music Experience
//           </h2>
//           {/* TIMER BLOK */}
//           <div className="flex gap-5 md:gap-7 mt-4 mb-4 md:mb-6">
//             <TimeBubble value={format2(hours)} label="Hours" />
//             <TimeBubble value={format2(days)} label="Days" />
//             <TimeBubble value={format2(minutes)} label="Minutes" />
//             <TimeBubble value={format2(seconds)} label="Seconds" />
//           </div>
//           <Button className="bg-green-500 text-white hover:bg-green-600 duration-150 rounded-md w-[170px] h-12 text-lg font-normal">
//             Buy Now!
//           </Button>
//         </div>
//         {/* PRODUCT IMAGE */}
//         <div className="flex-1 flex items-center justify-center relative px-2 md:px-8 select-none">
//           <Image 
//             src="/images/krosovkalar1.png" 
//             alt="JBL Music Speaker"
//             width={500}
//             height={330}
//             className="object-contain w-full max-w-[480px] drop-shadow-lg"
//             priority
//             unoptimized
//           />
//         </div>
//         {/* FON EFFEKTI */}
//         {/* <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-gray-900 z-0" /> */}
//       </div>
//     </section>
//   );
// }

// // Soatlarni aylana ichida ko‘rsatish
// function TimeBubble({ value, label }: { value: string | number, label: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center bg-white text-black w-[65px] h-[65px] rounded-full font-bold shadow-md">
//       <span className="text-lg md:text-2xl font-bold">{value}</span>
//       <span className="text-xs font-normal">{label}</span>
//     </div>
//   );
// }
// function format2(n: number) { return String(n).padStart(2, "0"); }

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

// Timer hook
function useCountdown(target: Date) {
  const [ms, setMs] = React.useState(() => Math.max(0, target.getTime() - Date.now()));
  React.useEffect(() => {
    const t = setInterval(() => setMs(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function MusicBannerSection() {
  // Timer to random 5 days ahead
  const target = React.useMemo(
    () => new Date(Date.now() + (5 * 86400 + 23 * 3600 + 59 * 60 + 35) * 1000),
    []
  );
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="w-full flex justify-center items-center py-4 xs:py-8 md:py-12 mt-4 md:mt-10 relative -z-10">
      <div className={`
        w-full max-w-6xl 
        bg-black 
        flex flex-col md:flex-row
        relative overflow-hidden
        items-stretch
        shadow-md
        ${/* 'aspect-[2.1/1]' faqat md ekranlarda */''}
        md:aspect-[2.1/1]
      `}>
        {/* LEFT CONTENT */}
        <div className="
          flex-1 flex flex-col justify-center 
          px-3 xs:px-6 md:px-14 
          py-6 xs:py-10 gap-4 xs:gap-8 z-10
        ">
          <span className="text-green-400 text-[15px] xs:text-[17px] font-semibold mb-2">
            Categories
          </span>
          <h2 className="text-white text-2xl xs:text-3xl md:text-5xl font-bold leading-tight max-w-[24ch] select-none">
            Enhance Your <br /> Music Experience
          </h2>
          {/* TIMER BLOK */}
          <div className="flex flex-wrap gap-3 xs:gap-5 md:gap-7 mt-3 xs:mt-4 mb-3 xs:mb-5">
            <TimeBubble value={format2(hours)} label="Hours" />
            <TimeBubble value={format2(days)} label="Days" />
            <TimeBubble value={format2(minutes)} label="Minutes" />
            <TimeBubble value={format2(seconds)} label="Seconds" />
          </div>
          <Button className="bg-green-500 text-white hover:bg-green-600 duration-150 rounded-md w-full xs:w-[170px] h-11 xs:h-12 text-base xs:text-lg font-normal mt-2">
            Buy Now!
          </Button>
        </div>
        {/* PRODUCT IMAGE */}
        <div className="flex-1 flex items-center justify-center relative px-1 xs:px-2 md:px-8 select-none min-h-[160px] xs:min-h-[220px] md:min-h-0">
          <Image 
            src="/images/krosovkalar1.png"
            alt="Music Speaker"
            width={500}
            height={330}
            className="object-contain w-full max-w-[320px] xs:max-w-[400px] md:max-w-[480px] drop-shadow-lg"
            priority
            unoptimized
          />
        </div>
        {/* Optional: Fon effekti (gradient qatlam) */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900 z-0" /> */}
      </div>
    </section>
  );
}

// Soatlarni aylana ichida ko‘rsatish
function TimeBubble({ value, label }: { value: string | number, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-black w-[56px] h-[56px] xs:w-[65px] xs:h-[65px] rounded-full font-bold shadow-md">
      <span className="text-base xs:text-lg md:text-2xl font-bold">{value}</span>
      <span className="text-[11px] xs:text-xs font-normal">{label}</span>
    </div>
  );
}
function format2(n: number) { return String(n).padStart(2, "0"); }