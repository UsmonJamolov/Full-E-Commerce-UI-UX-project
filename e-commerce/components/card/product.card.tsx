'use client'
import { Badge, Eye, Heart, Star } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FC, MouseEvent } from 'react'
import { IProduct } from "@/types";
import {useAction} from '@/hooks/use-action'
import { addFavorite } from '@/actions/user.action'
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
	product: IProduct
}

// === SHU YERdagi kodlarni yangiladik:
const ProductCard: FC<Props> = ({product}) => {
  const {isLoading, onError, setIsLoading} = useAction()
  const rotuer = useRouter()

  const onFavorite = async (e: MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    console.log('Favoritega Bosildi');
    
    
    const res = await addFavorite({id: product._id})
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError('Something went wrong')
    }
    if (res.data.failure) {
      return onError(res.data.failure)
    }
    if (res.data.status === 200) {
      toast('Added to favorites')
      setIsLoading(false)
    }
  }
  
  return (
    <div className="relative z-10 w-[170px] xs:w-[195px] sm:w-[230px] md:w-[260px] shrink-0">
      <Card className="border-0 shadow-none group">
        <div className="relative rounded-lg bg-muted/30 p-3 sm:p-4">
          <Badge className="absolute left-2 top-2 bg-red-500 text-white hover:bg-red-500 z-50 text-[11px] px-2 py-1 sm:left-3 sm:top-3">
            30%
          </Badge>
          <div className="absolute right-2 top-2 flex flex-col gap-2 z-50 sm:right-3 sm:top-3">
            <IconBubble ariaLabel="Wishlist" onClick={onFavorite}>
              <Heart className="h-4 w-4" />
            </IconBubble>
            <IconBubble ariaLabel="Quick view">
              <Eye className="h-4 w-4 z-50" />
            </IconBubble>
          </div>
          <div className="relative mx-auto aspect-square w-[110px] xs:w-[140px] sm:w-[180px]">
            <Image src='/images/gamepad.png' alt={product.title} fill className="object-contain" unoptimized />
          </div>
          {product.cta && (
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
          <p className="line-clamp-2 text-xs font-medium sm:text-sm">{product.title}</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm font-semibold text-red-500">${product.price}</span>
            <span className="text-[12px] text-muted-foreground line-through">$977</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Stars value={3} />
            <span className="text-[11px] text-muted-foreground">(75)</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function IconBubble({ children, ariaLabel, onClick }:
  { children: React.ReactNode; 
    ariaLabel: string; 
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-muted sm:h-9 sm:w-9 cursor-pointer"
      type="button"
    >
      {children}
    </button>
  );
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

export default ProductCard