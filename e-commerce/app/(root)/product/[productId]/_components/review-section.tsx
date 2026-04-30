'use client'

import { addProductReview } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'
import { IProductReview } from '@/types'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	productId: string
	reviews: IProductReview[]
}

const ReviewSection = ({ productId, reviews }: Props) => {
	const [rating, setRating] = useState(5)
	const [comment, setComment] = useState('')
	const { isLoading, setIsLoading, onError } = useAction()
	const router = useRouter()

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setIsLoading(true)
		const res = await addProductReview({ id: productId, rating, comment })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		toast.success('Review yuborildi')
		setComment('')
		router.refresh()
		setIsLoading(false)
	}

	return (
		<div className='mt-16 space-y-4 rounded-lg border p-4'>
			<h2 className='text-xl font-bold'>Mijozlar sharhlari</h2>
			<form onSubmit={onSubmit} className='space-y-2'>
				<div className='flex items-center gap-2'>
					<div className='flex gap-1'>
						{Array.from({ length: 5 }).map((_, idx) => (
							<button key={idx} type='button' onClick={() => setRating(idx + 1)} className='cursor-pointer'>
								<Star
									className={idx < rating ? 'h-5 w-5 fill-amber-400 text-amber-400' : 'h-5 w-5 text-muted-foreground'}
								/>
							</button>
						))}
					</div>
				</div>
				<Textarea
					value={comment}
					onChange={e => setComment(e.target.value)}
					placeholder='Sharhingizni yozing...'
				/>
				<Button type='submit' disabled={isLoading || !comment.trim()}>
					Sharh qoldirish
				</Button>
			</form>

			<div className='space-y-3'>
				{reviews.length === 0 && <p className='text-sm text-muted-foreground'>Hozircha sharh yo‘q.</p>}
				{reviews.map(item => (
					<div key={item._id} className='rounded-md border p-3'>
						<div className='mb-1 flex items-center justify-between'>
							<p className='font-medium'>{item.userName}</p>
							<p className='text-xs text-muted-foreground'>{new Date(item.createdAt).toLocaleDateString()}</p>
						</div>
						<div className='mb-1 flex'>
							{Array.from({ length: 5 }).map((_, idx) => (
								<Star
									key={idx}
									className={idx < item.rating ? 'h-4 w-4 fill-amber-400 text-amber-400' : 'h-4 w-4 text-muted-foreground'}
								/>
							))}
						</div>
						<p className='text-sm'>{item.comment}</p>
						{item.adminReply && (
							<div className='mt-2 rounded-md bg-secondary p-2 text-sm'>
								<span className='font-semibold'>Admin javobi:</span> {item.adminReply}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ReviewSection
