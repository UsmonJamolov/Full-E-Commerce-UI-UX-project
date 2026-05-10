import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { getProduct } from '@/actions/user.action'
import { Params } from '@/types'
import { FC } from 'react'
import { notFound } from 'next/navigation'
import ReviewSection from './_components/review-section'
import { cookies } from 'next/headers'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { categoryLabel, targetGroupLabel } from '@/lib/i18n/catalog-labels'

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

const Page = async ({ params }: Props) => {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data

	if (!product) return notFound()

	const store = await cookies()
	const locale = parseLocale(store.get('locale')?.value)
	const dict = getDictionary(locale)
	const categoryDisp = categoryLabel(dict, product.category)
	const groupDisp = product.targetGroup ? targetGroupLabel(dict, product.targetGroup) : ''
	
	return (
		<div>
			<div className='grid min-h-[72vh] grid-cols-1 items-center gap-4 py-6 md:grid-cols-3'>
				<div className='bg-secondary relative col-span-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md md:aspect-auto md:h-[70vh] md:min-h-[420px]'>
					<Image
						src={product.image}
						fill
						className='object-contain object-center p-4 md:p-8'
						alt={product.title}
						sizes='(max-width: 768px) 100vw, 66vw'
						priority
					/>
				</div>
				<div className='flex flex-col space-y-1 self-center'>
					<h1 className='font-bold text-4xl'>{product.title}</h1>
					<div className='flex flex-wrap items-center gap-2'>
						<Badge className='w-fit' variant={'secondary'}>
							# {categoryDisp}
						</Badge>
						{product.targetGroup && (
							<Badge className='w-fit' variant={'secondary'}>
								# {groupDisp}
							</Badge>
						)}
					</div>
					<p className='text-xs text-muted-foreground'>{product.description}</p>
					<p className='font-bold'>₽ {formatPrice(+product.price)}</p>
				</div>
			</div>
			<ReviewSection productId={product._id} reviews={product.reviews || []} />
		</div>
	)
}

export default Page	