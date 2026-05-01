'use client'

import { addFavorite } from '@/actions/user.action'
import { useAction } from '@/hooks/use-action'
import { cn, formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, Heart, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	product: IProduct
}

const ProductCard: FC<Props> = ({ product }) => {
	const { onError, setIsLoading } = useAction()
	const { data: session } = useSession()
	const router = useRouter()
	const favoriteIds = session?.currentUser?.favorites || []
	const inFavorites = useMemo(() => favoriteIds.some(item => String(item) === String(product._id)), [favoriteIds, product._id])
	const [isFavourite, setIsFavourite] = useState(inFavorites)

	const imageSrc = product.image
		? `${product.image}${product.image.includes('?') ? '&' : '?'}v=${encodeURIComponent(product.imageKey || product._id)}`
		: '/images/gamepad.png'

	const onFavorite = async (e: MouseEvent) => {
		e.stopPropagation()
		setIsLoading(true)

		const res = await addFavorite({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
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
			setIsFavourite(true)
			toast.success('Added to favorites')
		}
		setIsLoading(false)
	}

	const reviewCount = typeof product.reviewCount === 'number' ? product.reviewCount : Array.isArray(product.reviews) ? product.reviews.length : 0
	const ratingAverage =
		typeof product.ratingAverage === 'number'
			? product.ratingAverage
			: Array.isArray(product.reviews) && product.reviews.length > 0
				? product.reviews.reduce((sum, item) => sum + item.rating, 0) / product.reviews.length
				: 0

	return (
		<div onClick={() => router.push(`/product/${product._id}`)} className='cursor-pointer'>
			<div className='relative z-10 w-[170px] shrink-0 xs:w-[195px] sm:w-[230px] md:w-[260px]'>
				<Card className='group border-0 shadow-none'>
					<div className='relative rounded-lg bg-muted/30 p-3 sm:p-4'>
						{product.isNew && (
							<Badge className='absolute left-2 top-2 z-50 bg-black px-2 py-1 text-[11px] text-white hover:bg-black sm:left-3 sm:top-3'>
								NEW
							</Badge>
						)}
						<div className='absolute right-2 top-2 z-50 flex flex-col gap-2 sm:right-3 sm:top-3'>
							<IconBubble ariaLabel='Wishlist' onClick={onFavorite}>
								<Heart className={cn('h-4 w-4', (isFavourite || inFavorites) && 'fill-black text-black')} />
							</IconBubble>
							<IconBubble ariaLabel='Quick view'>
								<Eye className='h-4 w-4' />
							</IconBubble>
						</div>
						<div className='relative mx-auto aspect-square w-[110px] xs:w-[140px] sm:w-[180px]'>
							<Image src={imageSrc} alt={product.title} fill className='object-contain' unoptimized />
						</div>
						{product.cta && (
							<Button
								asChild
								className='mt-4 h-[6vh] w-full rounded-none bg-black py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 pointer-events-none sm:py-3 sm:text-sm'
							>
								<Link href='/'>Add To Cart</Link>
							</Button>
						)}
					</div>
					<div className='space-y-1 sm:space-y-2'>
						<p className='line-clamp-2 text-xs font-medium sm:text-sm'>{product.title}</p>
						<div className='flex items-center gap-2 sm:gap-3'>
							<span className='text-sm font-semibold text-red-500'>{formatPrice(product.price)}</span>
						</div>
						<div className='flex items-center gap-1 sm:gap-2'>
							<Stars value={ratingAverage} />
							<span className='text-[11px] text-muted-foreground'>({reviewCount})</span>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}

function IconBubble({
	children,
	ariaLabel,
	onClick,
}: {
	children: React.ReactNode
	ariaLabel: string
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			onClick={onClick}
			aria-label={ariaLabel}
			className='grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-muted sm:h-9 sm:w-9'
			type='button'
		>
			{children}
		</button>
	)
}

function Stars({ value }: { value: number }) {
	const full = Math.floor(value)
	const half = value - full >= 0.5
	const total = 5
	return (
		<div className='flex items-center gap-1'>
			{Array.from({ length: total }).map((_, i) => {
				const filled = i < full || (i === full && half)
				return <Star key={i} className={cn('h-4 w-4', filled ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground')} />
			})}
		</div>
	)
}

export default ProductCard
