'use client'

import { deleteProduct } from '@/actions/admin.aciton'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {useAction} from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { toast } from 'sonner'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	const { setOpen, setProduct } = useProduct()
	const {isLoading, onError, setIsLoading} = useAction()

	const onEdit = () => {
		setOpen(true)
		setProduct(product)
	}

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteProduct({ id: product._id })

		console.log('onDeleteda RES ni tekshiramiz: ', res);
		
		
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Product deleted successfully')
			setIsLoading(false)
		}
	}

	return (
		<div className='rounded-lg border bg-white p-3'>
			<div className='flex flex-col gap-3 md:flex-row md:items-center'>
				<div className='relative h-28 w-full overflow-hidden rounded-md bg-secondary md:w-32'>
					<Image src={product.image!} fill className='object-contain p-2' alt={product.title!} unoptimized />
				</div>
				<div className='min-w-0 flex-1'>
					<div className='mb-2 flex flex-wrap items-center gap-2'>
						<Badge variant='secondary'>{product.category}</Badge>
						<p className='text-sm font-semibold'>{formatPrice(product.price!)}</p>
					</div>
					<h1 className='line-clamp-1 text-base font-bold'>{product.title}</h1>
					<p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>{product.description}</p>
				</div>
				<div className='grid grid-cols-2 gap-2 md:w-[200px]'>
					<Button variant={'secondary'} onClick={onEdit}>
						Edit
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant={'outline'}>Delete</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={onDelete} disabled={isLoading}>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	)
}

export default ProductCard