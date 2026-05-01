'use client'

import { deletePurchaseItem, updatePurchaseItem } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAction } from '@/hooks/use-action'
import { IPurchaseItem } from '@/types'
import { Check, Loader2, Pencil, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
	items: IPurchaseItem[]
	onApprove?: (id: string) => Promise<void>
	approvingId?: string
}

const PurchaseItemList = ({ items, onApprove, approvingId }: Props) => {
	const [editingId, setEditingId] = useState('')
	const [draftName, setDraftName] = useState('')
	const [deletingId, setDeletingId] = useState('')
	const [savingId, setSavingId] = useState('')
	const { onError } = useAction()
	const router = useRouter()

	function startEdit(item: IPurchaseItem) {
		setEditingId(item._id)
		setDraftName(item.name)
	}

	function cancelEdit() {
		setEditingId('')
		setDraftName('')
	}

	async function onSave(id: string) {
		setSavingId(id)
		const res = await updatePurchaseItem({ id, name: draftName })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setSavingId('')
			return onError('Что-то пошло не так')
		}
		if (res.data.failure) {
			setSavingId('')
			return onError(res.data.failure)
		}
		toast.success('Название товара обновлено')
		cancelEdit()
		router.refresh()
		setSavingId('')
	}

	async function onDelete(id: string) {
		setDeletingId(id)
		const res = await deletePurchaseItem({ id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setDeletingId('')
			return onError('Что-то пошло не так')
		}
		if (res.data.failure) {
			setDeletingId('')
			return onError(res.data.failure)
		}
		toast.success('Товар удален')
		router.refresh()
		setDeletingId('')
	}

	return (
		<div className='space-y-2'>
			{items.map(item => (
				<div key={item._id} className='rounded-md border p-3'>
					<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
						<div className='min-w-0 flex-1'>
							{editingId === item._id ? (
								<Input value={draftName} onChange={e => setDraftName(e.target.value)} />
							) : (
								<p className='font-medium'>{item.name}</p>
							)}
						</div>
						<div className='flex flex-wrap items-center gap-2'>
							{editingId === item._id ? (
								<>
									<Button size='sm' onClick={() => onSave(item._id)} disabled={savingId === item._id || !draftName.trim()}>
										<Check />
										Сохранить
										{savingId === item._id && <Loader2 className='animate-spin' />}
									</Button>
									<Button size='sm' variant='outline' onClick={cancelEdit}>
										<X />
										Отмена
									</Button>
								</>
							) : (
								<>
									<Button size='sm' variant='secondary' onClick={() => startEdit(item)}>
										<Pencil />
										Редактировать
									</Button>
									<Button size='sm' variant='outline' onClick={() => onDelete(item._id)} disabled={deletingId === item._id}>
										<Trash2 />
										Удалить
										{deletingId === item._id && <Loader2 className='animate-spin' />}
									</Button>
									{onApprove && (
										<Button size='sm' onClick={() => void onApprove(item._id)} disabled={approvingId === item._id}>
											Подтвердить
											{approvingId === item._id && <Loader2 className='animate-spin' />}
										</Button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default PurchaseItemList
