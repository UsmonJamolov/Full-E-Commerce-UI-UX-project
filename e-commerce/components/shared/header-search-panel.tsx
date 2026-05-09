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
import { categoryFromCatalog } from '@/lib/i18n/catalog-labels'

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
	catalog: Dictionary['catalog']
	locale: Locale
}

const GROUP_VALUES: TargetGroup[] = ['Erkak', 'Ayol', 'Bola']

export default function HeaderSearchPanel({ items, searchPanel: copy, catalog, locale }: Props) {
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
				<div
					className='fixed inset-0 z-[70] min-h-[100dvh] bg-black/40'
					role='presentation'
					onClick={closePanel}
					onPointerDown={e => {
						if (e.target === e.currentTarget) closePanel()
					}}
				>
					<div
						className='max-h-[min(100dvh,900px)] w-full overflow-y-auto bg-white shadow-lg'
						role='dialog'
						aria-label={copy.placeholder}
						onClick={e => e.stopPropagation()}
						onPointerDown={e => e.stopPropagation()}
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

								<div className='grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-5'>
									{visibleItems.map(item => (
										<Link
											key={item._id}
											href={`/product/${item._id}`}
											className='group flex flex-col bg-white'
											onClick={recordIfQuery}
										>
											<div className='relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100'>
												<Image
													src={item.image}
													alt={item.title}
													fill
													className='object-cover transition duration-500 ease-out group-hover:scale-[1.02]'
													sizes='(max-width:640px) 44vw, (max-width:1024px) 28vw, 200px'
												/>
												<Heart
													className='pointer-events-none absolute right-2.5 top-2.5 h-5 w-5 fill-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]'
													strokeWidth={1.65}
													aria-hidden
												/>
											</div>
											<div className='mt-3 space-y-1'>
												<p className='line-clamp-2 text-[11px] font-normal uppercase leading-snug tracking-wide text-neutral-900 sm:text-xs'>
													{item.title}
												</p>
												<p className='text-sm font-bold tabular-nums text-neutral-900'>
													₽ {formatPrice(item.price)}
												</p>
												<p className='text-[10px] font-medium uppercase tracking-widest text-neutral-400'>
													{item.isNew ? copy.productNewBadge : categoryFromCatalog(catalog, item.category)}
												</p>
											</div>
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
