'use client'

import Image from 'next/image'
import { useState } from 'react'

import { buildNewArrivalFallbackCards, type PublicArrivalCard } from '@/lib/new-arrival-public'
import type { Locale } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

type Props = {
	initialCards: PublicArrivalCard[]
	locale: Locale
	featuredLabel: string
	titleLabel: string
}

function NewArrivalTile({
	image,
	title,
	sizes,
	wrapperClassName,
	overlayClassName,
	contentClassName,
	titleClassName,
	priority,
}: {
	image: string
	title: string
	sizes: string
	wrapperClassName: string
	overlayClassName: string
	contentClassName: string
	titleClassName: string
	priority?: boolean
}) {
	const [active, setActive] = useState(false)

	return (
		<div
			className={cn(
				'new-arrival-tile relative flex items-end overflow-hidden bg-black',
				wrapperClassName,
			)}
			data-active={active ? '' : undefined}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			<div className='new-arrival-tile__media absolute inset-0 z-0 overflow-hidden'>
				<Image
					src={image}
					alt={title}
					fill
					sizes={sizes}
					priority={priority}
					className='new-arrival-tile__img select-none object-cover object-center'
				/>
			</div>
			<div
				className={cn(
					'new-arrival-tile__overlay pointer-events-none absolute inset-0 z-10 bg-gradient-to-t',
					overlayClassName,
				)}
			/>
			<div className={cn('new-arrival-tile__title relative z-20', contentClassName)}>
				<h3 className={titleClassName}>{title}</h3>
			</div>
		</div>
	)
}

export default function NewArrivalSection({ initialCards, locale, featuredLabel, titleLabel }: Props) {
	const cards = initialCards.length === 4 ? initialCards : buildNewArrivalFallbackCards(locale)

	return (
		<section className='w-full py-8 md:py-12'>
			<div className='mx-auto w-full max-w-6xl px-3 sm:px-4'>
				<div className='mb-8'>
					<div className='flex items-center gap-2'>
						<div className='h-7 w-4 rounded bg-red-500' />
						<span className='text-[15px] font-semibold text-red-500'>{featuredLabel}</span>
					</div>
					<h2 className='mt-4 mb-2 text-3xl font-bold tracking-tight md:text-4xl'>{titleLabel}</h2>
				</div>
				<div className='grid grid-cols-1 grid-rows-3 gap-6 md:h-[510px] md:grid-cols-3 md:grid-rows-2'>
					<NewArrivalTile
						image={cards[0].image}
						title={cards[0].title}
						sizes='(max-width: 768px) 100vw, 800px'
						wrapperClassName='row-span-2 min-h-[230px] md:col-span-2 md:row-span-2 md:min-h-0'
						overlayClassName='from-black/95 via-black/60 to-transparent'
						contentClassName='pointer-events-none px-6 pb-8 pt-10 md:pb-12'
						titleClassName='text-xl font-bold text-white md:text-2xl'
						priority
					/>
					<NewArrivalTile
						image={cards[1].image}
						title={cards[1].title}
						sizes='(max-width: 768px) 100vw, 400px'
						wrapperClassName='min-h-[140px]'
						overlayClassName='from-black/90 via-black/60 to-transparent'
						contentClassName='pointer-events-none w-full px-5 pb-7 pt-8'
						titleClassName='text-lg font-semibold text-white'
						priority
					/>
					<div className='grid grid-cols-2 gap-6'>
						<NewArrivalTile
							image={cards[2].image}
							title={cards[2].title}
							sizes='(max-width: 768px) 100vw, 200px'
							wrapperClassName='min-h-[120px]'
							overlayClassName='from-black/90 via-black/60 to-transparent'
							contentClassName='pointer-events-none px-4 pb-7 pt-6'
							titleClassName='text-base font-semibold text-white'
							priority
						/>
						<NewArrivalTile
							image={cards[3].image}
							title={cards[3].title}
							sizes='(max-width: 768px) 100vw, 200px'
							wrapperClassName='min-h-[120px]'
							overlayClassName='from-black/90 via-black/60 to-transparent'
							contentClassName='pointer-events-none px-4 pb-7 pt-6'
							titleClassName='text-base font-semibold text-white'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
