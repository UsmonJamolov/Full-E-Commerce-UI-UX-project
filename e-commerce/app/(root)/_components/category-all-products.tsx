import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import Pagination from '@/components/shared/pagination'
import type { Locale } from '@/lib/i18n/dictionaries'
import type { SearchParams } from '@/types'
import { FC } from 'react'

/** API `product.category` bilan mos keladigan nomlar. */
export type CatalogCategoryFilter = 'Umbrellas' | 'Bags' | 'Backpacks' | 'Clothes'

const SUBTITLE: Record<Locale, Record<CatalogCategoryFilter, string>> = {
	en: {
		Umbrellas: 'All umbrella products in the catalog.',
		Bags: 'All bag products in the catalog.',
		Backpacks: 'All backpack products in the catalog.',
		Clothes: 'All clothing in the catalog.',
	},
	ru: {
		Umbrellas: 'Все зонты в каталоге.',
		Bags: 'Все сумки в каталоге.',
		Backpacks: 'Все рюкзаки в каталоге.',
		Clothes: 'Вся одежда в каталоге.',
	},
	uz: {
		Umbrellas: 'Katalogdagi barcha soyabonlar.',
		Bags: 'Katalogdagi barcha sumkalar.',
		Backpacks: 'Katalogdagi barcha ryukzaklar.',
		Clothes: 'Katalogdagi barcha kiyimlar.',
	},
}

type Props = {
	locale: Locale
	category: CatalogCategoryFilter
	title: string
	emptyLabel: string
	searchParams: SearchParams
}

const CategoryAllProducts: FC<Props> = async ({ locale, category, title, emptyLabel, searchParams }) => {
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category,
		page: `${searchParams.page || '1'}`,
		pageSize: '12',
	})
	const products = res?.data?.products || []
	const isNext = res?.data?.isNext || false
	const currentPage = searchParams?.page ? +searchParams.page : 1
	const subtitle = SUBTITLE[locale][category]

	return (
		<div className='mx-auto w-full max-w-6xl px-2 py-8 sm:px-4'>
			<h1 className='text-3xl font-bold'>{title}</h1>
			<p className='mt-1 text-sm text-muted-foreground'>{subtitle}</p>
			<div className='mt-6 flex gap-4 overflow-x-auto no-scrollbar'>
				{products.length === 0 && <p className='text-muted-foreground'>{emptyLabel}</p>}
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			<Pagination isNext={isNext} pageNumber={currentPage} />
		</div>
	)
}

export default CategoryAllProducts
