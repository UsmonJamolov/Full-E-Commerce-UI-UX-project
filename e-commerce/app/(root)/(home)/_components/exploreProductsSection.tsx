import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ExploreProductsSection = async ({
	badge,
	title,
	noProducts,
	viewAllLabel,
}: {
	badge: string
	title: string
	noProducts: string
	viewAllLabel: string
}) => {
	const res = await getProducts({
		searchQuery: '',
		filter: 'newest',
		category: '',
		page: '1',
		pageSize: '40',
	})
	const blocked = new Set(['erkak', 'ayol', 'shoes'])
	const products = (res?.data?.products || []).filter(product => !blocked.has((product.category || '').toLowerCase())).slice(0, 8)

	return (
		<section className='w-full py-8 md:py-12'>
			<div className='w-full max-w-6xl mx-auto px-2 sm:px-4'>
				<div className='flex items-start justify-between gap-2 md:gap-4 w-full'>
					<div className='flex flex-col gap-1'>
						<div className='flex items-center gap-2'>
							<div className='h-7 w-2 rounded bg-red-500' />
							<span className='text-red-500 text-[15px] font-semibold'>{badge}</span>
						</div>
						<h2 className='mt-3 text-3xl md:text-4xl font-bold'>{title}</h2>
					</div>
				</div>

				<div className='mt-8 flex gap-4 overflow-x-auto no-scrollbar'>
					{products.length === 0 && <p>{noProducts}</p>}
					{products.map(product => (
						<ProductCard key={product._id} product={{ ...product, cta: false }} />
					))}
				</div>

				<div className='flex justify-center mt-10'>
					<Button asChild className='bg-red-500 hover:bg-red-600 text-white px-8 h-12 text-base rounded'>
						<Link href='/explore-products'>{viewAllLabel}</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default ExploreProductsSection

