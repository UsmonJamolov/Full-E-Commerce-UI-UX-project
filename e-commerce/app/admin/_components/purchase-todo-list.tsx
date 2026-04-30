'use client'

import { approvePurchaseItem, createPurchaseItem } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAction } from '@/hooks/use-action'
import { IPurchaseItem } from '@/types'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import PurchaseItemList from './purchase-item-list'

interface Props {
	items: IPurchaseItem[]
}

const PurchaseTodoList = ({ items }: Props) => {
	const [name, setName] = useState('')
	const [approvingId, setApprovingId] = useState('')
	const { isLoading, setIsLoading, onError } = useAction()
	const router = useRouter()

	async function onCreate(e: FormEvent) {
		e.preventDefault()
		setIsLoading(true)
		const res = await createPurchaseItem({ name })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		setName('')
		toast.success('Tovar ro‘yxatga qo‘shildi')
		router.refresh()
		setIsLoading(false)
	}

	async function onApprove(id: string) {
		setApprovingId(id)
		const res = await approvePurchaseItem({ id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setApprovingId('')
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			setApprovingId('')
			return onError(res.data.failure)
		}
		toast.success('Sotib olishga tasdiqlandi')
		router.refresh()
		setApprovingId('')
	}

	return (
		<div className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h1 className='text-2xl font-bold'>Yangi sotib olinadigan tovarlar</h1>
				<p className='text-sm text-muted-foreground'>
					Sotuvchi tugab qolgan mahsulot nomini kiritadi. Tasdiqlangan tovarlar alohida bo‘limga o‘tadi.
				</p>
			</div>

			<form onSubmit={onCreate} className='flex gap-2'>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Masalan: iPhone 15 Pro max original'
					disabled={isLoading}
				/>
				<Button type='submit' disabled={isLoading || !name.trim()}>
					<Plus />
					Qo‘shish
					{isLoading && <Loader2 className='animate-spin' />}
				</Button>
			</form>

			<div className='space-y-2'>
				{items.length === 0 && <p className='text-sm text-muted-foreground'>Hozircha pending tovarlar yo‘q.</p>}
				<PurchaseItemList items={items} onApprove={onApprove} approvingId={approvingId} />
			</div>
		</div>
	)
}

export default PurchaseTodoList
