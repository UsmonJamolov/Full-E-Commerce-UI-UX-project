import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import Pagination from '@/components/shared/pagination'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'
import { FC, Suspense } from 'react'
import { SearchParams } from '@/types'
import ShoesTargetGroupFilters from './_components/shoes-target-group-filters'

const TARGET_GROUPS = ['Erkak', 'Ayol', 'Bola'] as const

interface Props {
	searchParams: Promise<SearchParams>
}

const ShoesProductsPage: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const rawTg = searchParams.targetGroup
	const tgStr = Array.isArray(rawTg) ? rawTg[0] : rawTg
	const targetGroup =
		tgStr && TARGET_GROUPS.includes(tgStr as (typeof TARGET_GROUPS)[number])
			? (tgStr as (typeof TARGET_GROUPS)[number])
			: undefined

	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: 'Shoes',
		...(targetGroup ? { targetGroup } : {}),
		page: `${searchParams.page || '1'}`,
		pageSize: '40',
	})
	const products = res?.data?.products || []
	const isNext = res?.data?.isNext || false
	const currentPage = searchParams?.page ? +searchParams.page : 1

	const store = await cookies()
	const locale = parseLocale(store.get('locale')?.value)
	const dict = getDictionary(locale)
	const cat = dict.catalog

	return (
		<div className='mx-auto w-full max-w-6xl px-2 sm:px-4 py-8'>
			<h1 className='text-3xl font-bold tracking-tight'>{cat.shoesPageTitle}</h1>
			<p className='mt-1 text-sm text-muted-foreground'>{cat.shoesPageDescription}</p>
			<Suspense fallback={<div className='mt-5 h-9' aria-hidden />}>
				<ShoesTargetGroupFilters
					groupLabel={cat.shoesGroupLabel}
					allFootwear={cat.shoesAllFootwear}
					targetGroups={cat.targetGroups}
				/>
			</Suspense>
			<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{products.length === 0 && <p>{cat.shoesNoProducts}</p>}
				{products.map(product => (
					<ProductCard key={product._id} product={product} layout='grid' />
				))}
			</div>
			<Pagination isNext={isNext} pageNumber={currentPage} />
		</div>
	)
}

export default ShoesProductsPage
