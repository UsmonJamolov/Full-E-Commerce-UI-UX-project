import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import Pagination from '@/components/shared/pagination'
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
		pageSize: '12',
	})
	const products = res?.data?.products || []
	const isNext = res?.data?.isNext || false
	const currentPage = searchParams?.page ? +searchParams.page : 1

	return (
		<div className='mx-auto w-full max-w-6xl px-2 sm:px-4 py-8'>
			<h1 className='text-3xl font-bold'>Shoes Products</h1>
			<p className='text-sm text-muted-foreground mt-1'>Shoes kategoriyasidagi barcha mahsulotlar.</p>
			<Suspense fallback={<div className='mt-5 h-9' aria-hidden />}>
				<ShoesTargetGroupFilters />
			</Suspense>
			<div className='flex gap-4 overflow-x-auto mt-6'>
				{products.length === 0 && <p>No products found</p>}
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			<Pagination isNext={isNext} pageNumber={currentPage} />
		</div>
	)
}

export default ShoesProductsPage
