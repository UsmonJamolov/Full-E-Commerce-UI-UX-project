// const FlashSalesPage = () => {
//     return (
//         <div className="flex">
//             <div className="flex">
//                 <div className="w-10 h-20 border border-radius-1 bg-color-red-500"></div>
//                 <h1 className="text-1xl text-red-500">Today's</h1>
//             </div>
//             <div className="">
//                 <div className="flex">
//                     <h1 className="font-bold">Flash Sles</h1>
//                     <div className="flex">
//                         <div>
//                             <p>Days</p>
//                             <h1>03</h1>
//                         </div>
//                         <div>
//                             <p>Hours</p>
//                             <h1>23</h1>
//                         </div>
//                         <div>
//                             <p>Minutes</p>
//                             <h1>19</h1>
//                         </div>
//                         <div>
//                             <p>Seconds</p>
//                             <h1>56</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="bg-primary border border-radius-50">Arrow left</div>
//                     <div className="bg-primary border border-radius-50">Arrow right</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FlashSalesPage

"use client";
import * as React from "react"; 
import Image from "next/image"; 
import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge"; 
import { Heart, Eye, ArrowLeft, ArrowRight, Star } 
from "lucide-react"; 
import { cn } from "@/lib/utils";


type Product = { id: string; title: string; image: string; discountPercent: number; price: number; oldPrice: number;  rating: number; reviews: number; cta?: boolean;} // show "Add To Cart" bar ;


function format2(n: number) { return String(n).padStart(2, "0"); }


function useCountdown(target: Date) { const [ms, setMs] = React.useState(() => Math.max(0, target.getTime() - Date.now()));


React.useEffect(() => { const t = setInterval(() => { setMs(Math.max(0, target.getTime() - Date.now())); }, 1000); return () => clearInterval(t); }, [target]);


const totalSeconds = Math.floor(ms / 1000); const days = Math.floor(totalSeconds / 86400); const hours = Math.floor((totalSeconds % 86400) / 3600); const minutes = Math.floor((totalSeconds % 3600) / 60); const seconds = totalSeconds % 60;


return { days, hours, minutes, seconds }; }


function Stars({ value }: { value: number }) { const full = Math.floor(value); const half = value - full >= 0.5; const total = 5;


return ( <div className="flex items-center gap-1"> {Array.from({ length: total }).map((_, i) => { const filled = i < full || (i === full && half); return ( <Star key={i} className={cn("h-4 w-4", filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} /> ); })} </div> ); }


export function FlashSalesSection() { const target = React.useMemo(() => new Date(Date.now() + (3 *  86400 + 23 *  3600 + 19 * 60 + 56),  1000), []); const { days, hours, minutes, seconds } = useCountdown(target); // Demo deadline: 3 days 23:19:56 from now (like screenshot vibe) 


const products: Product[] = [ { id: "1", title: "HAVIT HV-G92 Gamepad", image: "/images/gamepad.png", discountPercent: 40, price: 120, oldPrice: 160, rating: 5, reviews: 88, }, { id: "2", title: "AK-900 Wired Keyboard", image: "/images/keyboard.png", discountPercent: 35, price: 960, oldPrice: 1160, rating: 4, reviews: 75, cta: true, }, { id: "3", title: "IPS LCD Gaming Monitor", image: "/images/monitor.png", discountPercent: 30, price: 370, oldPrice: 400, rating: 5, reviews: 99, }, { id: "4", title: "S-Series Comfort Chair", image: "/images/chair.png", discountPercent: 25, price: 375, oldPrice: 400, rating: 4.5, reviews: 99, }, { id: "5", title: "S-Series Comfort Chair", image: "/images/chair.png", discountPercent: 25, price: 375, oldPrice: 400, rating: 4.5, reviews: 99, }, ];


const scrollerRef = React.useRef(null);
const scrollByCards = (dir: "prev" | "next") => { const el = scrollerRef.current; if (!el) return;

//@ts-ignore
const amount = Math.round(el.clientWidth * 0.9);


//@ts-ignore
el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth", }); };


return ( <section className="w-full py-10"> <div className="mx-auto w-full max-w-6xl px-4"> <div className="flex items-start justify-between gap-4"> <div className="flex items-start gap-4"> <div className="mt-1 h-10 w-2 rounded bg-red-500" /> <div> <p className="text-sm font-medium text-red-500">Today’s</p> <h2 className="text-4xl font-semibold tracking-tight">Flash Sales</h2>


<div className="mt-4 flex items-end gap-6"> <TimeBlock label="Days" value={format2(days)} /> <Colon /> <TimeBlock label="Hours" value={format2(hours)} /> <Colon /> <TimeBlock label="Minutes" value={format2(minutes)} /> <Colon /> <TimeBlock label="Seconds" value={format2(seconds)} /> </div> </div> </div>


 <div className="flex items-center gap-2 pt-2"> <Button variant="ghost" size="icon" className="rounded-full bg-muted/60" onClick={() => scrollByCards("prev")} aria-label="Previous" > <ArrowLeft className="h-5 w-5" /> </Button> <Button variant="ghost" size="icon" className="rounded-full bg-muted/60" onClick={() => scrollByCards("next")} aria-label="Next" > <ArrowRight className="h-5 w-5" /> </Button> </div> </div>


 <div ref={scrollerRef} className="mt-8 flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" > {products.map((p) => ( <ProductCard key={p.id} p={p} /> ))} </div>


 <div className="mt-10 flex justify-center"> <Button className="h-12 rounded-md bg-red-500 px-10 text-white hover:bg-red-600"> View All Products </Button> </div> </div> </section> ); }


function Colon() { return <span className="pb-1 text-2xl font-semibold text-red-500">:</span>; }


function TimeBlock({ label, value }: { label: string; value: string }) { return ( <div className="flex flex-col items-center"> <span className="text-xs text-muted-foreground">{label}</span> <span className="text-3xl font-semibold">{value}</span> </div> ); }


function ProductCard({ p }: { p: Product }) { return ( <div className="w-[260px] shrink-0"> <Card className="border-0 shadow-none"> <div className="relative rounded-lg bg-muted/30 p-4"> <Badge className="absolute left-3 top-3 bg-red-500 text-white hover:bg-red-500 z-50"> -{p.discountPercent}% </Badge>


<div className="absolute right-3 top-3 flex flex-col gap-2 z-50"> <IconBubble ariaLabel="Wishlist"> <Heart className="h-4 w-4" /> </IconBubble> <IconBubble ariaLabel="Quick view"> <Eye className="h-4 w-4 z-50" /> </IconBubble> </div>


<div className="relative mx-auto aspect-square w-[180px]"> <Image src={p.image} alt={p.title} fill className="object-contain " unoptimized  /> </div>


{p.cta && ( <button className="mt-4 w-full rounded-md bg-black py-3 text-sm font-medium text-white"> Add To Cart </button> )} </div>


<div className="mt-4 space-y-2"> <p className="line-clamp-2 text-sm font-medium">{p.title}</p>


<div className="flex items-center gap-3"> <span className="text-sm font-semibold text-red-500">${p.price}</span> <span className="text-sm text-muted-foreground line-through">${p.oldPrice}</span> </div>


<div className="flex items-center gap-2"> <Stars value={p.rating} /> <span className="text-xs text-muted-foreground">({p.reviews})</span> </div> </div> </Card> </div> ); }


function IconBubble({ children, ariaLabel, }: { children: React.ReactNode; ariaLabel: string; }) { return ( <button aria-label={ariaLabel} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-muted" type="button" > {children} </button> ); }