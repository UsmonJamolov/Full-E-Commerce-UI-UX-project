'use client'

import { addProductReview, replyProductReview } from '@/actions/user.action'
import { useI18n } from '@/components/providers/i18n-provider'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'
import { IProductReview } from '@/types'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	productId: string
	reviews: IProductReview[]
}

const ReviewSection = ({ productId, reviews }: Props) => {
	const { dictionary } = useI18n()
	const pr = dictionary.productReviews
	const [rating, setRating] = useState(5)
	const [comment, setComment] = useState('')
	const [replyByReview, setReplyByReview] = useState<Record<string, string>>({})
	const { isLoading, setIsLoading, onError } = useAction()
	const { data: session } = useSession()
	const router = useRouter()
	const isAdmin = session?.currentUser?.role === 'admin'

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
		toast.success(pr.toastSent)
		setComment('')
		router.refresh()
		setIsLoading(false)
	}

	async function onReplySubmit(review: IProductReview) {
		const replyText = (replyByReview[review._id] ?? review.adminReply ?? '').trim()
		if (!replyText) return
		setIsLoading(true)
		try {
			const res = await replyProductReview({
				productId,
				reviewId: review._id,
				comment: review.comment,
				rating: review.rating,
				adminReply: replyText,
			})
			if (res?.serverError || res?.validationErrors || !res?.data) {
				return onError('Something went wrong')
			}
			if (res.data.failure) {
				return onError(res.data.failure)
			}
			toast.success(pr.toastReplySaved)
			setReplyByReview(prev => ({ ...prev, [review._id]: '' }))
			router.refresh()
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='mt-16 space-y-4 rounded-lg border p-4'>
			<h2 className='text-xl font-bold'>{pr.title}</h2>
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
					placeholder={pr.placeholder}
				/>
				<Button type='submit' disabled={isLoading || !comment.trim()}>
					{pr.submit}
				</Button>
			</form>

			<div className='space-y-3'>
				{reviews.length === 0 && <p className='text-sm text-muted-foreground'>{pr.emptyList}</p>}
				{reviews.map(item => (
					<div key={item._id} className='rounded-md border p-3'>
						<div className='mb-1 flex items-center justify-between'>
							<p className='font-medium'>
								{item.userName}{' '}
								{item.isAdmin && (
									<span className='rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700'>
										{pr.adminBadge}
									</span>
								)}
							</p>
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
								<span className='font-semibold'>{pr.adminReplyPrefix}</span> {item.adminReply}
							</div>
						)}
						{isAdmin && (
							<div className='mt-3 space-y-2'>
								<Textarea
									value={replyByReview[item._id] ?? item.adminReply ?? ''}
									onChange={e => setReplyByReview(prev => ({ ...prev, [item._id]: e.target.value }))}
									placeholder={pr.adminReplyPlaceholder}
								/>
								<Button
									type='button'
									disabled={isLoading || !(replyByReview[item._id] || item.adminReply || '').trim()}
									onClick={() => onReplySubmit(item)}
								>
									{pr.replySubmit}
								</Button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ReviewSection
