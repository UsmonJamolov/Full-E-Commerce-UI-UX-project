import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import AddProduct from '../_components/add-product'
import ProductCard from '../_components/product.card'
import { products } from '@/lib/constants'
// import { getProducts } from '@/actions/admin.aciton'

const Page = () => {
	// const res = await getProducts()
	// const products = res?.data?.products
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Products</h1>
				<AddProduct />
			</div>

			<Separator className='my-3' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
				{/* {products && products.length === 0 && <p className='text-muted-foreground'>No products found</p>}
				{products && products.map(product => <ProductCard key={product._id} product={product} />)} */}
			</div>
		</>
	)
}

export default Page