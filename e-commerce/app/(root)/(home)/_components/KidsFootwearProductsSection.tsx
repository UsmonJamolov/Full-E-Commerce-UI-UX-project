import { getProducts } from '@/actions/user.action'
import BestSellingContent from './BestSellingContent'

const KidsFootwearProductsSection = async ({
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
		targetGroup: 'Bola',
		page: '1',
		pageSize: '4',
	})
	let products = res?.data?.products || []
	if (products.length === 0) {
		const fallbackRes = await getProducts({
			searchQuery: '',
			filter: 'newest',
			category: '',
			targetGroup: '',
			page: '1',
			pageSize: '4',
		})
		products = fallbackRes?.data?.products || []
	}

	return (
		<BestSellingContent
			products={products}
			title={title}
			noProducts={noProducts}
			viewAllLabel={viewAllLabel}
			viewAllHref='/shoes-products?targetGroup=Bola'
		/>
	)
}

export default KidsFootwearProductsSection
