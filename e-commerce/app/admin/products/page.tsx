import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import AddProduct from '../_components/add-product'
import ProductCard from '../_components/product.card'
import { getAdminCategories, getProducts } from '@/actions/admin.aciton'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'
import { FC } from 'react'
import { SearchParams } from '@/types'
import Pagination from '@/components/shared/pagination'

interface Props {
	searchParams: Promise<SearchParams>
}
const Page: FC<Props> = async (props) => {
	const searchParams = await props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: `${searchParams.category || ''}`,
		page: `${searchParams.page || '1'}`,
		pageSize: '10'
	})
	const categoryRes = await getAdminCategories()
	const categoryOptions = (categoryRes?.data?.categories || []).map(item => item.name)
	const products = res?.data?.products
	const isNext = res?.data?.isNext || false
	const store = await cookies()
	const dict = getDictionary(parseLocale(store.get('locale')?.value))
	const a = dict.admin
	return (
		<div className='space-y-4'>
			<div className='rounded-lg border bg-white p-4'>
				<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
					<div className='min-w-0'>
						<h1 className='text-2xl font-bold'>{a.productsTitle}</h1>
						<p className='text-sm text-muted-foreground'>{a.productsLead}</p>
					</div>
					<div className='w-full shrink-0 md:w-auto'>
						<AddProduct />
					</div>
				</div>
				<Separator className='my-4' />
				<Filter showCategory categoryOptions={categoryOptions} />
			</div>
			<div className='grid grid-cols-1 gap-3'>
				{products && products.length === 0 && <p className='text-muted-foreground'>{a.productsEmpty}</p>}
				{products && products.map(product => <ProductCard key={product._id} product={product} />)}
			</div>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</div>
	)
}

export default Page