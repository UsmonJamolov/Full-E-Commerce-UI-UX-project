'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IProduct } from '@/types'
import ProductCard from '@/components/card/product-card'
import Link from 'next/link'

interface Props {
	products: IProduct[]
	title: string
	noProducts: string
	viewAllLabel: string
	viewAllHref?: string
}

const BestSellingContent = ({
	products,
	title,
	noProducts,
	viewAllLabel,
	viewAllHref = '/shoes-products',
}: Props) => {
	const scrollerRef = React.useRef<HTMLDivElement>(null)

	const scrollByCards = (dir: 'prev' | 'next') => {
		const el = scrollerRef.current
		if (!el) return
		const amount = Math.round(el.clientWidth * 0.9)
		el.scrollBy({
			left: dir === 'next' ? amount : -amount,
			behavior: 'smooth',
		})
	}

	return (
		<section className='w-full py-6 md:py-10'>
			<div className='mx-auto w-full max-w-6xl px-2 sm:px-4'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl sm:text-2xl md:text-4xl'>{title}</h2>
					<div className='flex shrink-0 gap-2 self-end sm:self-auto'>
						<Button type='button' size='icon' onClick={() => scrollByCards('prev')} aria-label='Previous'>
							<ArrowLeft />
						</Button>
						<Button type='button' size='icon' onClick={() => scrollByCards('next')} aria-label='Next'>
							<ArrowRight />
						</Button>
					</div>
				</div>

				<div
					ref={scrollerRef}
					className='mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar [-webkit-overflow-scrolling:touch]'
				>
					{products.length === 0 && <p>{noProducts}</p>}
					{products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
				<div className='flex justify-center mt-8'>
					<Button asChild className='bg-red-500 hover:bg-red-600 text-white px-8 h-12 text-base rounded'>
						<Link href={viewAllHref}>{viewAllLabel}</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default BestSellingContent
