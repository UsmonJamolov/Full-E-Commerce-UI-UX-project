import { getProducts } from '@/actions/user.action'
import FlashSalesContent from './FlashSalesContent'


interface Props {
	title: string
	noProducts: string
	viewAllLabel: string
}

export default async function FlashSalesSection({ title, noProducts, viewAllLabel }: Props) {
	const res = await getProducts({
		searchQuery: '',
		filter: 'newest',
		category: 'Shoes',
		targetGroup: 'Erkak',
		page: '1',
		pageSize: '8',
	})
	const products = res?.data?.products || []

	return <FlashSalesContent products={products} title={title} noProducts={noProducts} viewAllLabel={viewAllLabel} />
}
