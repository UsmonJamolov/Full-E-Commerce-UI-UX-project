import { getProducts } from '@/actions/user.action'
import BestSellingContent from './BestSellingContent'

const BestSellingProductsSection = async ({
	title,
	noProducts,
	viewAllLabel,
}: {
	title: string
	noProducts: string
	viewAllLabel: string
}) => {
	const res = await getProducts({
		searchQuery: '',
		filter: 'newest',
		category: 'Shoes',
		targetGroup: 'Ayol',
		page: '1',
		pageSize: '4',
	})
	const products = res?.data?.products || []

	return (
		<BestSellingContent
			products={products}
			title={title}
			noProducts={noProducts}
			viewAllLabel={viewAllLabel}
			viewAllHref='/shoes-products?targetGroup=Ayol&category=Shoes'
		/>
	)
}

export default BestSellingProductsSection