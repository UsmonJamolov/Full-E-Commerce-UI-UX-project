import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product.card'
import Pagination from '@/components/shared/pagination'
import { FC } from 'react'
import { SearchParams } from '@/types'

interface Props {
	searchParams: Promise<SearchParams>
}

const ShoesProductsPage: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: 'Shoes',
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
