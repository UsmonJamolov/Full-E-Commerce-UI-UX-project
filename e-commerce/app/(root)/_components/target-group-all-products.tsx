import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import Pagination from '@/components/shared/pagination'
import type { Locale } from '@/lib/i18n/dictionaries'
import type { SearchParams } from '@/types'
import { FC } from 'react'

export type CatalogTargetGroup = 'Ayol' | 'Erkak' | 'Bola'

const SUBTITLE: Record<Locale, Record<CatalogTargetGroup, string>> = {
	en: {
		Ayol: 'All products for women across every category.',
		Erkak: 'All products for men across every category.',
		Bola: 'All products for children across every category.',
	},
	ru: {
		Ayol: 'Все товары для женщин во всех категориях.',
		Erkak: 'Все товары для мужчин во всех категориях.',
		Bola: 'Все товары для детей во всех категориях.',
	},
	uz: {
		Ayol: 'Barcha kategoriyalarda ayollar uchun mahsulotlar.',
		Erkak: 'Barcha kategoriyalarda erkaklar uchun mahsulotlar.',
		Bola: 'Barcha kategoriyalarda bolalar uchun mahsulotlar.',
	},
}

type Props = {
	locale: Locale
	targetGroup: CatalogTargetGroup
	title: string
	emptyLabel: string
	searchParams: SearchParams
}

const TargetGroupAllProducts: FC<Props> = async ({ locale, targetGroup, title, emptyLabel, searchParams }) => {
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: 'All',
		targetGroup,
		page: `${searchParams.page || '1'}`,
		pageSize: '12',
	})
	const products = res?.data?.products || []
	const isNext = res?.data?.isNext || false
	const currentPage = searchParams?.page ? +searchParams.page : 1
	const subtitle = SUBTITLE[locale][targetGroup]

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

export default TargetGroupAllProducts
