import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { getProduct } from '@/actions/user.action'
import { Params } from '@/types'
import { FC } from 'react'
import { notFound } from 'next/navigation'
import ReviewSection from './_components/review-section'

interface Props {
	params: Params
}

export async function generateMetadata({ params }: Props) {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data

	return {
		title: product?.title,
		description: product?.description,
		openGraph: { images: product?.image },
	}
}

const Page = async ({params}: Props) => {
	const {productId} = await params

	const res = await getProduct({id: productId})
	
	console.log('Products Id ni tekshiramiz Res orqali', res);
	
	const product = res?.data
	
	console.log('Products Id ni tekshiramiz', res);
	

	if (!product) return notFound()
	
	return (
		<div>
			<div className='grid min-h-[72vh] grid-cols-1 items-center gap-4 py-6 md:grid-cols-3'>
				<div className='bg-secondary relative w-full h-[70vh] col-span-2'>
					<Image src={product.image} fill className='object-contain p-8' alt={product.title} unoptimized />
				</div>
				<div className='flex flex-col space-y-1 self-center'>
					<h1 className='font-bold text-4xl'>{product.title}</h1>
					<div className='flex items-center gap-2'>
						<Badge className='w-fit' variant={'secondary'}>
							# {product.category}
						</Badge>
						{product.targetGroup && (
							<Badge className='w-fit' variant={'secondary'}>
								# {product.targetGroup}
							</Badge>
						)}
					</div>
					<p className='text-xs text-muted-foreground'>{product.description}</p>
					<p className='font-bold'>{formatPrice(+product.price)}</p>
				</div>
			</div>
			<ReviewSection productId={product._id} reviews={product.reviews || []} />
		</div>
	)
}

export default Page	