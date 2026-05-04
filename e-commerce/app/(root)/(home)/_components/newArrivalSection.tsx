import Image from 'next/image'

import { buildNewArrivalFallbackCards, type PublicArrivalCard } from '@/lib/new-arrival-public'
import type { Locale } from '@/lib/i18n/dictionaries'

type Props = {
	initialCards: PublicArrivalCard[]
	locale: Locale
	featuredLabel: string
	titleLabel: string
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
					<div className='relative row-span-2 flex min-h-[230px] items-end overflow-hidden bg-black md:col-span-2 md:row-span-2 md:min-h-0'>
						<Image
							src={cards[0].image}
							alt={cards[0].title}
							fill
							className='pointer-events-none z-0 select-none object-contain object-center md:object-left-bottom'
							sizes='(max-width: 768px) 100vw, 800px'
							unoptimized
							priority
						/>
						<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent' />
						<div className='relative z-20 px-6 pb-8 pt-10 md:pb-12'>
							<h3 className='text-xl font-bold text-white md:text-2xl'>{cards[0].title}</h3>
						</div>
					</div>
					<div className='relative flex min-h-[140px] items-end overflow-hidden bg-black'>
						<Image
							src={cards[1].image}
							alt={cards[1].title}
							fill
							className='pointer-events-none z-0 select-none object-contain object-right-top'
							sizes='(max-width: 768px) 100vw, 400px'
							unoptimized
							priority
						/>
						<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent' />
						<div className='relative z-20 w-full px-5 pb-7 pt-8'>
							<h3 className='text-lg font-semibold text-white'>{cards[1].title}</h3>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-6'>
						<div className='relative flex min-h-[120px] items-end overflow-hidden bg-black'>
							<Image
								src={cards[2].image}
								alt={cards[2].title}
								fill
								className='pointer-events-none z-0 select-none object-contain object-center'
								sizes='(max-width: 768px) 100vw, 200px'
								unoptimized
								priority
							/>
							<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent' />
							<div className='relative z-20 px-4 pb-7 pt-6'>
								<h3 className='text-base font-semibold text-white'>{cards[2].title}</h3>
							</div>
						</div>
						<div className='relative flex min-h-[120px] items-end overflow-hidden bg-black'>
							<Image
								src={cards[3].image}
								alt={cards[3].title}
								fill
								className='pointer-events-none z-0 select-none object-contain object-center'
								sizes='(max-width: 768px) 100vw, 200px'
								unoptimized
								priority
							/>
							<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent' />
							<div className='relative z-20 px-4 pb-7 pt-6'>
								<h3 className='text-base font-semibold text-white'>{cards[3].title}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
