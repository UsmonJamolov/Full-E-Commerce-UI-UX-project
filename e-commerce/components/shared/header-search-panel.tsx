'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IProduct } from '@/types'
import { formatPrice } from '@/lib/utils'
import type { Dictionary, Locale } from '@/lib/i18n/dictionaries'

const STORAGE_V2 = 'ecommerce-search-popular-v2'
const LEGACY_RECENT_V1 = 'ecommerce-header-search-recent-v1'

type StatEntry = { k: string; d: string; c: number; t: number }
type StatStore = Partial<Record<Locale, StatEntry[]>>

function loadStore(): StatStore {
	if (typeof window === 'undefined') return {}
	try {
		const raw = window.localStorage.getItem(STORAGE_V2)
		if (!raw) return {}
		const p = JSON.parse(raw) as StatStore
		return p && typeof p === 'object' ? p : {}
	} catch {
		return {}
	}
}

function saveStore(store: StatStore) {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(STORAGE_V2, JSON.stringify(store))
	} catch {
		/* ignore */
	}
}

/** Bir marta: eski «recent» ro‘yxatini yangi chastota formatiga o‘tkazadi. */
function migrateLegacyIfNeeded() {
	if (typeof window === 'undefined') return
	if (window.localStorage.getItem(STORAGE_V2) !== null) return

	const store: StatStore = {}
	const leg = window.localStorage.getItem(LEGACY_RECENT_V1)
	if (leg) {
		try {
			const map = JSON.parse(leg) as Partial<Record<Locale, string[]>>
			for (const loc of ['en', 'ru', 'uz'] as const) {
				const arr = map[loc]
				if (!Array.isArray(arr)) continue
				const list: StatEntry[] = []
				for (const term of arr) {
					const d = String(term).trim()
					if (d.length < 2) continue
					const k = d.toLowerCase()
					const ex = list.find(e => e.k === k)
					if (ex) ex.c += 1
					else list.push({ k, d, c: 1, t: Date.now() })
				}
				if (list.length) store[loc] = list
			}
		} catch {
			/* ignore */
		}
		window.localStorage.removeItem(LEGACY_RECENT_V1)
	}
	saveStore(store)
}

function recordSearch(locale: Locale, display: string) {
	const d = display.trim()
	if (d.length < 2 || typeof window === 'undefined') return
	migrateLegacyIfNeeded()
	const k = d.toLowerCase()
	const store = loadStore()
	const list = [...(store[locale] || [])]
	const i = list.findIndex(e => e.k === k)
	const t = Date.now()
	if (i >= 0) {
		list[i] = { k, d, c: list[i].c + 1, t }
	} else {
		list.push({ k, d, c: 1, t })
	}
	const sorted = [...list].sort((a, b) => b.c - a.c || b.t - a.t).slice(0, 80)
	store[locale] = sorted
	saveStore(store)
}

function getPopular(locale: Locale, limit: number): { key: string; display: string; count: number }[] {
	if (typeof window === 'undefined') return []
	migrateLegacyIfNeeded()
	const list = loadStore()[locale] || []
	return [...list]
		.sort((a, b) => b.c - a.c || b.t - a.t)
		.slice(0, limit)
		.map(({ k, d, c }) => ({ key: k, display: d, count: c }))
}

type TargetGroup = 'Erkak' | 'Ayol' | 'Bola'

interface Props {
	items: IProduct[]
	searchPanel: Dictionary['searchPanel']
	locale: Locale
}

const GROUP_VALUES: TargetGroup[] = ['Erkak', 'Ayol', 'Bola']

export default function HeaderSearchPanel({ items, searchPanel: copy, locale }: Props) {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [popular, setPopular] = useState<{ key: string; display: string; count: number }[]>([])

	const hasFilters = useMemo(
		() => query.trim().length > 0 || selectedCategory.length > 0,
		[query, selectedCategory],
	)

	useEffect(() => {
		if (open) setPopular(getPopular(locale, 8))
	}, [open, locale])

	const refreshPopular = useCallback(() => {
		setPopular(getPopular(locale, 8))
	}, [locale])

	const closePanel = useCallback(() => {
		const t = query.trim()
		if (t.length >= 2) {
			recordSearch(locale, t)
			refreshPopular()
		}
		setOpen(false)
	}, [query, locale, refreshPopular])

	const shownItems = useMemo(() => {
		if (!hasFilters) {
			return [...items]
				.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0))
				.slice(0, 8)
		}
		const term = query.trim().toLowerCase()
		return items.filter(item => {
			const byQuery =
				term.length === 0 ||
				item.title.toLowerCase().includes(term) ||
				item.description.toLowerCase().includes(term) ||
				item.category.toLowerCase().includes(term) ||
				(item.targetGroup && item.targetGroup.toLowerCase().includes(term))
			const byGroup =
				selectedCategory.length === 0 ||
				item.targetGroup === selectedCategory ||
				item.category === selectedCategory
			return byQuery && byGroup
		})
	}, [items, query, selectedCategory, hasFilters])

	const visibleItems = useMemo(() => shownItems.slice(0, 8), [shownItems])

	const onPopularClick = (word: string) => {
		setQuery(word)
	}

	const onCategoryClick = (value: TargetGroup) => {
		setSelectedCategory(prev => (prev === value ? '' : value))
	}

	const categoryLabel = (value: TargetGroup) => {
		if (value === 'Erkak') return copy.categoryMen
		if (value === 'Ayol') return copy.categoryWomen
		return copy.categoryKids
	}

	const allProductsHref =
		query.trim().length > 0 ? `/all-products?q=${encodeURIComponent(query.trim())}` : '/all-products'

	const recordIfQuery = () => {
		const t = query.trim()
		if (t.length >= 2) {
			recordSearch(locale, t)
			refreshPopular()
		}
	}

	return (
		<>
			<Button variant='ghost' size='icon' onClick={() => setOpen(true)} aria-label={copy.placeholder}>
				<Search className='h-5 w-5' />
			</Button>

			{open && (
				<div className='fixed inset-0 z-[70] bg-black/30' role='presentation' onClick={closePanel}>
					<div
						className='w-full bg-white shadow-lg'
						role='dialog'
						aria-label={copy.placeholder}
						onClick={e => e.stopPropagation()}
					>
						<div className='mx-auto max-w-6xl px-4 py-4'>
							<div className='mb-4 flex items-center justify-between gap-2'>
								<div className='relative flex-1'>
									<Input
										placeholder={copy.placeholder}
										className='pl-10'
										value={query}
										onChange={e => setQuery(e.target.value)}
									/>
									<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								</div>
								<Button type='button' variant='ghost' onClick={closePanel}>
									<X className='h-4 w-4' /> {copy.close}
								</Button>
							</div>

							<div className='grid grid-cols-1 gap-4 md:grid-cols-[260px_minmax(0,1fr)]'>
								<div className='space-y-3 text-sm'>
									{query.trim().length > 0 && (
										<div className='rounded bg-secondary px-2 py-1 text-xs'>{query}</div>
									)}
									{popular.length > 0 && (
										<div>
											<p className='mb-1 text-muted-foreground'>{copy.popularHeading}</p>
											<ul className='space-y-1'>
												{popular.map(({ key, display, count }) => (
													<li key={key}>
														<button
															type='button'
															className='flex w-full items-baseline justify-between gap-2 text-left hover:underline'
															onClick={() => onPopularClick(display)}
														>
															<span className='min-w-0 break-words'>{display}</span>
															<span className='shrink-0 text-[11px] text-muted-foreground tabular-nums'>
																×{count}
															</span>
														</button>
													</li>
												))}
											</ul>
										</div>
									)}
									<div>
										<p className='mb-1 text-muted-foreground'>{copy.categoriesHeading}</p>
										<ul className='space-y-1'>
											{GROUP_VALUES.map(value => (
												<li key={value}>
													<button
														type='button'
														className={
															selectedCategory === value ? 'font-semibold underline' : 'hover:underline'
														}
														onClick={() => onCategoryClick(value)}
													>
														{categoryLabel(value)}
													</button>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
									{visibleItems.map(item => (
										<Link
											key={item._id}
											href={`/product/${item._id}`}
											className='space-y-1'
											onClick={recordIfQuery}
										>
											<div className='relative h-44 overflow-hidden rounded bg-secondary'>
												<Image src={item.image} alt={item.title} fill className='object-cover' />
												<Heart className='absolute right-2 top-2 h-4 w-4 text-white' />
											</div>
											<p className='line-clamp-2 text-xs font-medium'>{item.title}</p>
											<p className='text-[11px] font-semibold'>{formatPrice(item.price)}</p>
											<p className='text-[10px] text-muted-foreground'>{item.category}</p>
										</Link>
									))}
									{hasFilters && visibleItems.length === 0 && (
										<p className='col-span-full text-sm text-muted-foreground'>{copy.noResults}</p>
									)}
								</div>
							</div>
							<div className='mt-4'>
								<Link
									href={allProductsHref}
									className='text-sm underline underline-offset-4'
									onClick={() => {
										recordIfQuery()
										setOpen(false)
									}}
								>
									{copy.viewAllResults}
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
