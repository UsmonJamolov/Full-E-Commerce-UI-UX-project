import CardLoader from '@/components/loaders/card.loader'
import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { Suspense } from 'react'
import { cookies } from 'next/headers'

const Loading = async () => {
	const cookieStore = await cookies()
	const d = getDictionary(parseLocale(cookieStore.get('locale')?.value)).dashboard

	return (
		<>
			<h1 className='text-xl font-bold'>{d.watchListPageTitle}</h1>
			<Separator className='my-3' />
			<Suspense>
				<Filter showCategory />
			</Suspense>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{Array.from({ length: 4 }).map((_, i) => (
					<CardLoader key={i} />
				))}
			</div>
		</>
	)
}

export default Loading
