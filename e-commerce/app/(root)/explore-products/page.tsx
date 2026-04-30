import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product.card'
import Pagination from '@/components/shared/pagination'
import { SearchParams } from '@/types'
import { FC } from 'react'

interface Props {
	searchParams: Promise<SearchParams>
}

const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: `${searchParams.category || ''}`,
		page: `${searchParams.page || '1'}`,
		pageSize: '40',
	})
	const blocked = new Set(['erkak', 'ayol', 'shoes'])
	const filteredProducts = (res?.data?.products || []).filter(product => !blocked.has((product.category || '').toLowerCase()))
	const currentPage = searchParams?.page ? +searchParams.page : 1
	const pageSize = 12
	const start = (currentPage - 1) * pageSize
	const products = filteredProducts.slice(start, start + pageSize)
	const isNext = filteredProducts.length > start + products.length

	return (
		<div className='mx-auto w-full max-w-6xl px-2 sm:px-4 py-8'>
			<h1 className='text-3xl font-bold'>Explore Products</h1>
			<p className='text-sm text-muted-foreground mt-1'>Oxirgi yaratilgan barcha mahsulotlar ro&apos;yxati.</p>
			<div className='flex gap-4 overflow-x-auto mt-6'>
				{products.length === 0 && <p>No products found</p>}
				{products.map(product => (
					<ProductCard key={product._id} product={{ ...product, cta: false }} />
				))}
			</div>
			<Pagination isNext={isNext} pageNumber={currentPage} />
		</div>
	)
}

export default Page
