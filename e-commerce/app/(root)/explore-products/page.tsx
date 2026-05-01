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

const Page: FC<Props> = async props => {
	const [searchParams, cookieStore] = await Promise.all([props.searchParams, cookies()])
	const locale = parseLocale(cookieStore.get('locale')?.value)
	const dict = getDictionary(locale)

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

	const leadByLocale = {
		en: 'List of the latest created products.',
		ru: 'Список всех недавно созданных товаров.',
		uz: 'Oxirgi yaratilgan barcha mahsulotlar ro`yxati.',
	} as const

	return (
		<div className='mx-auto w-full max-w-6xl px-2 py-8 sm:px-4'>
			<h1 className='text-3xl font-bold'>{dict.home.exploreProductsTitle}</h1>
			<p className='mt-1 text-sm text-muted-foreground'>{leadByLocale[locale]}</p>
			<div className='mt-6 flex gap-4 overflow-x-auto no-scrollbar'>
				{products.length === 0 && <p>{dict.home.noProducts}</p>}
				{products.map(product => (
					<ProductCard key={product._id} product={{ ...product, cta: false }} />
				))}
			</div>
			<Pagination isNext={isNext} pageNumber={currentPage} />
		</div>
	)
}

export default Page
