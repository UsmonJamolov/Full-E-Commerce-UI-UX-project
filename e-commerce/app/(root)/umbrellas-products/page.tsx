import CategoryAllProducts from '../_components/category-all-products'
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
		<CategoryAllProducts
			locale={locale}
			category='Umbrellas'
			title={dict.home.sidebarCategories[3]}
			emptyLabel={dict.home.noProducts}
			searchParams={searchParams}
		/>
	)
}

export default Page
