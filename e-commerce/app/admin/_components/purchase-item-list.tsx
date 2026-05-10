'use client'

import { deletePurchaseItem, updatePurchaseItem, uploadFile } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'
import { IPurchaseItem } from '@/types'
import { Check, Loader2, Pencil, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	items: IPurchaseItem[]
	onApprove?: (id: string) => Promise<void>
	approvingId?: string
}

const PurchaseItemList = ({ items, onApprove, approvingId }: Props) => {
	const [editingId, setEditingId] = useState('')
	const [draftName, setDraftName] = useState('')
	const [draftFile, setDraftFile] = useState<File | null>(null)
	const [draftPreview, setDraftPreview] = useState('')
	const [deletingId, setDeletingId] = useState('')
	const [savingId, setSavingId] = useState('')
	const { onError } = useAction()
	const router = useRouter()

	useEffect(() => {
		if (!draftFile) {
			setDraftPreview('')
			return
		}
		const u = URL.createObjectURL(draftFile)
		setDraftPreview(u)
		return () => URL.revokeObjectURL(u)
	}, [draftFile])

	function startEdit(item: IPurchaseItem) {
		setEditingId(item._id)
		setDraftName(item.name)
		setDraftFile(null)
	}

	function cancelEdit() {
		setEditingId('')
		setDraftName('')
		setDraftFile(null)
	}

	async function onSave(id: string) {
		setSavingId(id)
		try {
			let image: string | undefined
			let imageKey: string | undefined
			if (draftFile) {
				const uploaded = await uploadFile({
					file: draftFile,
					fileName: draftFile.name,
					fileType: draftFile.type,
					fileSize: draftFile.size,
				})
				if (!uploaded?.data?.url) {
					setSavingId('')
					return onError('Не удалось загрузить изображение')
				}
				image = uploaded.data.url
				imageKey = uploaded.data.key
			}

			const res = await updatePurchaseItem({
				id,
				name: draftName,
				...(image ? { image, imageKey } : {}),
			})
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
		} finally {
			setSavingId('')
		}
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
						<div className='flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
							{item.image ? (
								<div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted'>
									<Image src={item.image} alt='' fill className='object-cover' unoptimized />
								</div>
							) : (
								<div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground'>
									нет фото
								</div>
							)}
							<div className='min-w-0 flex-1'>
								{editingId === item._id ? (
									<div className='space-y-2'>
										<Input value={draftName} onChange={e => setDraftName(e.target.value)} />
										<div className='space-y-1'>
											<Label className='text-xs'>Новое фото (необязательно)</Label>
											<Input
												type='file'
												accept='image/jpeg,image/png,image/webp,image/gif'
												onChange={e => setDraftFile(e.target.files?.[0] || null)}
											/>
										</div>
										{draftPreview && (
											<div className='relative h-16 w-16 overflow-hidden rounded border'>
												<Image src={draftPreview} alt='' fill className='object-cover' unoptimized />
											</div>
										)}
									</div>
								) : (
									<p className='font-medium'>{item.name}</p>
								)}
							</div>
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
