import { getFavorurites } from '@/actions/user.action'
import WatchListCard from '@/components/card/watch-list.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { SearchParams } from '@/types'
import { cookies } from 'next/headers'
import React, { FC, Suspense } from 'react'

interface Props {
	searchParams: Promise<SearchParams>
}

const Page: FC<Props> = async props => {
	const [searchParams, cookieStore] = await Promise.all([props.searchParams, cookies()])
	const dict = getDictionary(parseLocale(cookieStore.get('locale')?.value))
	const res = await getFavorurites({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
		category: `${searchParams.category || ''}`,
	})

	const products = res?.data?.products
	const isNext = res?.data?.isNext || false
	
	return (
		<>
			<h1 className='text-xl font-bold'>{dict.dashboard.watchListPageTitle}</h1>

			<Separator className='my-3' />

			<Suspense>
				<Filter showCategory />
			</Suspense>

			{products && products.length === 0 && (
				<div className='text-center mt-3'>{dict.dashboard.watchListEmpty}</div>
			)}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{products && products.map(product => (
					<WatchListCard key={product._id} product={product} />
				))}
			</div>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</>
	)
}

export default Page