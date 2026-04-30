'use client'
import { Eye, Heart, Star } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FC, MouseEvent, useState } from 'react'
import { IProduct } from "@/types";
import {useAction} from '@/hooks/use-action'
import { addFavorite } from '@/actions/user.action'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

interface Props {
	product: IProduct
}

// === SHU YERdagi kodlarni yangiladik:
const ProductCard: FC<Props> = ({product}) => {
  const {onError, setIsLoading} = useAction()
  const router = useRouter()
  const [isFavourite, setIsFavourite] = useState(false)
  const imageSrc = product.image
    ? `${product.image}${product.image.includes("?") ? "&" : "?"}v=${encodeURIComponent(product.imageKey || product._id)}`
    : "/images/gamepad.png"

  const onFavorite = async (e: MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    console.log('Favoritega Bosildi');
    
    
    const res = await addFavorite({id: product._id})
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError('Something went wrong')
    }
    if (res.data.failure) {
      if (res.data.failure.toLowerCase().includes('already')) {
        setIsFavourite(true)
      }
      setIsLoading(false)
      return onError(res.data.failure)
    }
    if (res.data.status === 200) {
      toast('Added to favorites')
      setIsFavourite(true)
      setIsLoading(false)
    }
  }
  const reviewCount = typeof product.reviewCount === 'number'
    ? product.reviewCount
    : Array.isArray(product.reviews)
      ? product.reviews.length
      : 0
  const ratingAverage = typeof product.ratingAverage === 'number'
    ? product.ratingAverage
    : Array.isArray(product.reviews) && product.reviews.length > 0
      ? product.reviews.reduce((sum, item) => sum + item.rating, 0) / product.reviews.length
      : 0
  
  return (
    <div onClick={() => router.push(`/product/${product._id}`)} className="cursor-pointer">
      <div className="relative z-10 w-[170px] xs:w-[195px] sm:w-[230px] md:w-[260px] shrink-0">
        <Card className="border-0 shadow-none group">
          <div className="relative rounded-lg bg-muted/30 p-3 sm:p-4">
            {product.isNew && (
              <Badge className="absolute left-2 top-2 bg-black text-white hover:bg-black z-50 text-[11px] px-2 py-1 sm:left-3 sm:top-3">
                NEW
              </Badge>
            )}
            <div className="absolute right-2 top-2 flex flex-col gap-2 z-50 sm:right-3 sm:top-3">
              <IconBubble ariaLabel="Wishlist" onClick={onFavorite}>
                <Heart className={cn("h-4 w-4", isFavourite && "fill-black text-black")} />
              </IconBubble>
              <IconBubble ariaLabel="Quick view">
                <Eye className="h-4 w-4 z-50" />
              </IconBubble>
            </div>
            <div className="relative mx-auto aspect-square w-[110px] xs:w-[140px] sm:w-[180px]">
              <Image src={imageSrc} alt={product.title} fill className="object-contain" unoptimized />
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
              <span className="text-sm font-semibold text-red-500">{product.price}</span>
              {/* <span className="text-[12px] text-muted-foreground line-through">$977</span> */}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Stars value={ratingAverage} />
              <span className="text-[11px] text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </Card>
      </div>
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