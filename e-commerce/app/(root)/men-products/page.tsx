import TargetGroupAllProducts from '../_components/target-group-all-products'
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

	return (
		<TargetGroupAllProducts
			locale={locale}
			targetGroup='Erkak'
			title={dict.home.sidebarCategories[1]}
			emptyLabel={dict.home.noProducts}
			searchParams={searchParams}
		/>
	)
}

export default Page
