import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import Pagination from '@/components/shared/pagination'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { SearchParams } from '@/types'
import { cookies } from 'next/headers'
import { FC } from 'react'

interface Props {
	searchParams: Promise<SearchParams>
}

/** Barcha mahsulotlar — `explore-products` bilan bir xil katalog. */
const Page: FC<Props> = async props => {
	const [searchParams, cookieStore] = await Promise.all([props.searchParams, cookies()])
	const locale = parseLocale(cookieStore.get('locale')?.value)
	const dict = getDictionary(locale)

	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: 'All',
		page: `${searchParams.page || '1'}`,
		pageSize: '40',
	})
	const products = res?.data?.products || []
	const isNext = res?.data?.isNext || false
	const currentPage = searchParams?.page ? +searchParams.page : 1

	const leadByLocale = {
		en: 'All products across every category.',
		ru: 'Все товары во всех категориях.',
		uz: 'Barcha kategoriyalardagi mahsulotlar.',
	} as const

	return (
		<div className='mx-auto w-full max-w-6xl px-2 py-8 sm:px-4'>
			<h1 className='text-3xl font-bold'>{dict.home.exploreProductsTitle}</h1>
			<p className='mt-1 text-sm text-muted-foreground'>{leadByLocale[locale]}</p>
			<div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4'>
				{products.length === 0 && (
					<p className='col-span-full text-muted-foreground'>{dict.home.noProducts}</p>
				)}
				{products.map(product => (
					<div key={product._id} className='min-w-0'>
						<ProductCard product={{ ...product, cta: false }} layout='grid' />
					</div>
				))}
			</div>
			<div className='mt-10 flex w-full justify-center border-t border-border/60 pt-8'>
				<Pagination isNext={isNext} pageNumber={currentPage} />
			</div>
		</div>
	)
}

export default Page
