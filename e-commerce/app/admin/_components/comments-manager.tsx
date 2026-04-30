'use client'

import { deleteAdminReview, updateAdminReview } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'
import { IAdminReviewItem } from '@/types'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
	reviews: IAdminReviewItem[]
}

const CommentsManager = ({ reviews }: Props) => {
	const [editingId, setEditingId] = useState('')
	const [form, setForm] = useState({ comment: '', rating: 5, adminReply: '' })
	const [loadingId, setLoadingId] = useState('')
	const { onError } = useAction()
	const router = useRouter()

	function onStartEdit(item: IAdminReviewItem) {
		setEditingId(item.reviewId)
		setForm({
			comment: item.comment,
			rating: item.rating,
			adminReply: item.adminReply || '',
		})
	}

	async function onSave(item: IAdminReviewItem) {
		setLoadingId(item.reviewId)
		const res = await updateAdminReview({
			productId: item.productId,
			reviewId: item.reviewId,
			comment: form.comment,
			rating: form.rating,
			adminReply: form.adminReply,
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setLoadingId('')
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			setLoadingId('')
			return onError(res.data.failure)
		}
		toast.success('Comment yangilandi')
		setEditingId('')
		setLoadingId('')
		router.refresh()
	}

	async function onDelete(item: IAdminReviewItem) {
		setLoadingId(item.reviewId)
		const res = await deleteAdminReview({
			productId: item.productId,
			reviewId: item.reviewId,
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setLoadingId('')
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			setLoadingId('')
			return onError(res.data.failure)
		}
		toast.success('Comment o‘chirildi')
		setLoadingId('')
		router.refresh()
	}

	return (
		<div className='space-y-3'>
			{reviews.length === 0 && <p className='text-sm text-muted-foreground'>Hozircha commentlar yo‘q.</p>}
			{reviews.map(item => (
				<div key={item.reviewId} className='rounded-lg border p-4 space-y-2'>
					<div className='flex items-center justify-between'>
						<p className='font-semibold'>{item.productTitle}</p>
						<p className='text-xs text-muted-foreground'>{new Date(item.createdAt).toLocaleDateString()}</p>
					</div>
					<p className='text-sm text-muted-foreground'>Mijoz: {item.userName}</p>

					{editingId === item.reviewId ? (
						<>
							<Input
								type='number'
								min={1}
								max={5}
								value={form.rating}
								onChange={e => setForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
							/>
							<Textarea
								value={form.comment}
								onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
								placeholder='Mijoz kommenti'
							/>
							<Textarea
								value={form.adminReply}
								onChange={e => setForm(prev => ({ ...prev, adminReply: e.target.value }))}
								placeholder='Admin javobi'
							/>
						</>
					) : (
						<>
							<p className='text-sm'>Rating: {item.rating}/5</p>
							<p className='text-sm'>{item.comment}</p>
							{item.adminReply && <p className='text-sm rounded bg-secondary p-2'>Admin javobi: {item.adminReply}</p>}
						</>
					)}

					<div className='flex gap-2'>
						{editingId === item.reviewId ? (
							<>
								<Button size='sm' onClick={() => onSave(item)} disabled={loadingId === item.reviewId}>
									Saqlash {loadingId === item.reviewId && <Loader2 className='animate-spin' />}
								</Button>
								<Button size='sm' variant='outline' onClick={() => setEditingId('')}>
									Bekor
								</Button>
							</>
						) : (
							<>
								<Button size='sm' variant='secondary' onClick={() => onStartEdit(item)}>
									Edit
								</Button>
								<Button size='sm' variant='outline' onClick={() => onDelete(item)} disabled={loadingId === item.reviewId}>
									Delete {loadingId === item.reviewId && <Loader2 className='animate-spin' />}
								</Button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default CommentsManager
