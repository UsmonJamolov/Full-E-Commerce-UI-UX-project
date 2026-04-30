import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import AddProduct from '../_components/add-product'
import ProductCard from '../_components/product.card'
import { getAdminCategories, getProducts } from '@/actions/admin.aciton'
import { FC } from 'react'
import { SearchParams } from '@/types'
import Pagination from '@/components/shared/pagination'

interface Props {
	searchParams: Promise<SearchParams>
}

const additionsCategory = "Qo'shimchalar"

const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: additionsCategory,
		page: `${searchParams.page || '1'}`,
		pageSize: '10',
	})
	const categoryRes = await getAdminCategories()
	const categoryOptions = (categoryRes?.data?.categories || []).map(item => item.name)
	const products = res?.data?.products
	const isNext = res?.data?.isNext || false

	return (
		<div className='space-y-4'>
			<div className='rounded-lg border bg-white p-4'>
				<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
					<div>
						<h1 className='text-2xl font-bold'>Qo&apos;shimchalar</h1>
						<p className='text-sm text-muted-foreground'>Best selling bo&apos;limi uchun mahsulotlar.</p>
					</div>
					<AddProduct />
				</div>
				<Separator className='my-4' />
				<Filter showCategory categoryOptions={categoryOptions} />
			</div>
			<div className='grid grid-cols-1 gap-3'>
				{products && products.length === 0 && <p className='text-muted-foreground'>No products found</p>}
				{products && products.map(product => <ProductCard key={product._id} product={product} />)}
			</div>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</div>
	)
}

export default Page
