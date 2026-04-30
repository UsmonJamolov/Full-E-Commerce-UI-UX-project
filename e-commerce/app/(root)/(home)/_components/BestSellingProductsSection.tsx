import { getProducts } from '@/actions/user.action'
import BestSellingContent from './BestSellingContent'

const BestSellingProductsSection = async () => {
	const res = await getProducts({
		searchQuery: '',
		filter: 'newest',
		category: 'Shoes',
		targetGroup: 'Ayol',
		page: '1',
		pageSize: '4',
	})
	const products = res?.data?.products || []

	return <BestSellingContent products={products} />
}

export default BestSellingProductsSection