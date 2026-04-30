'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { IProduct } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
	items: IProduct[]
}

const popularWords = ['futbolka ayollar', 'ko‘ylak', 'erkaklar jinsi']
const quickCategories = ['Erkak', 'Ayol', 'Bola']

const HeaderSearchPanel = ({ items }: Props) => {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')

	const shownItems = useMemo(() => {
		const term = query.trim().toLowerCase()
		const filtered = items.filter(item => {
			const byQuery =
				term.length === 0 ||
				item.title.toLowerCase().includes(term) ||
				item.description.toLowerCase().includes(term)
			const byCategory = selectedCategory.length === 0 || item.category === selectedCategory
			return byQuery && byCategory
		})

		const hasFilters = term.length > 0 || selectedCategory.length > 0
		if (hasFilters) return filtered.slice(0, 8)

		return [...items]
			.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0))
			.slice(0, 8)
	}, [items, query, selectedCategory])

	const onPopularClick = (word: string) => {
		setQuery(word)
	}

	const onCategoryClick = (category: string) => {
		setSelectedCategory(prev => (prev === category ? '' : category))
	}

	return (
		<>
			<Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
				<Search className='h-5 w-5' />
			</Button>

			{open && (
				<div className='fixed inset-0 z-[70] bg-black/30'>
					<div className='w-full bg-white shadow-lg'>
						<div className='mx-auto max-w-6xl px-4 py-4'>
							<div className='mb-4 flex items-center justify-between gap-2'>
								<div className='relative flex-1'>
									<Input
										placeholder='Поиск по каталогу'
										className='pl-10'
										value={query}
										onChange={e => setQuery(e.target.value)}
									/>
									<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								</div>
								<Button variant='ghost' onClick={() => setOpen(false)}>
									<X className='h-4 w-4' /> Yopish
								</Button>
							</div>

							<div className='grid grid-cols-1 gap-4 md:grid-cols-[260px_minmax(0,1fr)]'>
								<div className='space-y-3 text-sm'>
									{query.trim().length > 0 && (
										<div className='rounded bg-secondary px-2 py-1 text-xs'>
											{query}
										</div>
									)}
									<div>
										<p className='mb-1 text-muted-foreground'>Populyar qidiruvlar</p>
										<ul className='space-y-1'>
											{popularWords.map(word => (
												<li key={word}>
													<button
														type='button'
														className='text-left hover:underline'
														onClick={() => onPopularClick(word)}
													>
														{word}
													</button>
												</li>
											))}
										</ul>
									</div>
									<div>
										<p className='mb-1 text-muted-foreground'>Kategoriyalar</p>
										<ul className='space-y-1'>
											{quickCategories.map(category => (
												<li key={category}>
													<button
														type='button'
														className={selectedCategory === category ? 'font-semibold underline' : 'hover:underline'}
														onClick={() => onCategoryClick(category)}
													>
														{category}
													</button>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
									{shownItems.map(item => (
										<Link key={item._id} href={`/product/${item._id}`} className='space-y-1'>
											<div className='relative h-44 overflow-hidden rounded bg-secondary'>
												<Image src={item.image} alt={item.title} fill className='object-cover' />
												<Heart className='absolute right-2 top-2 h-4 w-4 text-white' />
											</div>
											<p className='line-clamp-2 text-xs font-medium'>{item.title}</p>
											<p className='text-[11px] font-semibold'>{formatPrice(item.price)}</p>
											<p className='text-[10px] text-muted-foreground'>{item.category}</p>
										</Link>
									))}
									{shownItems.length === 0 && (
										<p className='text-sm text-muted-foreground'>Mahsulot topilmadi.</p>
									)}
								</div>
							</div>
							<div className='mt-4'>
								<Link href='/' className='text-sm underline underline-offset-4'>
									Barcha natijalarni ko‘rish
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default HeaderSearchPanel
