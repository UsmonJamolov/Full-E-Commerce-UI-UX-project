'use client'

import { approvePurchaseItem, createPurchaseItem, uploadFile } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'
import { IPurchaseItem } from '@/types'
import { Loader2, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import PurchaseItemList from './purchase-item-list'

interface Props {
	items: IPurchaseItem[]
}

const PurchaseTodoList = ({ items }: Props) => {
	const [name, setName] = useState('')
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState('')
	const [approvingId, setApprovingId] = useState('')
	const { isLoading, setIsLoading, onError } = useAction()
	const router = useRouter()

	useEffect(() => {
		if (!file) {
			setPreview('')
			return
		}
		const u = URL.createObjectURL(file)
		setPreview(u)
		return () => URL.revokeObjectURL(u)
	}, [file])

	async function onCreate(e: FormEvent) {
		e.preventDefault()
		setIsLoading(true)
		try {
			let image: string | undefined
			let imageKey: string | undefined
			if (file) {
				const uploaded = await uploadFile({
					file,
					fileName: file.name,
					fileType: file.type,
					fileSize: file.size,
				})
				if (!uploaded?.data?.url) {
					setIsLoading(false)
					return onError('Не удалось загрузить изображение')
				}
				image = uploaded.data.url
				imageKey = uploaded.data.key
			}

			const res = await createPurchaseItem({ name, image, imageKey })
			if (res?.serverError || res?.validationErrors || !res?.data) {
				return onError('Что-то пошло не так')
			}
			if (res.data.failure) {
				return onError(res.data.failure)
			}
			setName('')
			setFile(null)
			toast.success('Товар добавлен в список')
			router.refresh()
		} finally {
			setIsLoading(false)
		}
	}

	async function onApprove(id: string) {
		setApprovingId(id)
		const res = await approvePurchaseItem({ id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setApprovingId('')
			return onError('Что-то пошло не так')
		}
		if (res.data.failure) {
			setApprovingId('')
			return onError(res.data.failure)
		}
		toast.success('Закупка подтверждена')
		router.refresh()
		setApprovingId('')
	}

	return (
		<div className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h1 className='text-2xl font-bold'>Новые заявки на закупку</h1>
				<p className='text-sm text-muted-foreground'>
					Продавец добавляет закончившиеся товары. Подтвержденные позиции переходят в отдельный раздел.
				</p>
			</div>

			<form onSubmit={onCreate} className='space-y-3'>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-end'>
					<div className='min-w-0 flex-1 space-y-2'>
						<Label htmlFor='purchase-name'>Название</Label>
						<Input
							id='purchase-name'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Например: iPhone 15 Pro max original'
							disabled={isLoading}
						/>
					</div>
					<div className='space-y-2 sm:w-64'>
						<Label htmlFor='purchase-image'>Фото (необязательно)</Label>
						<Input
							id='purchase-image'
							type='file'
							accept='image/jpeg,image/png,image/webp,image/gif'
							disabled={isLoading}
							onChange={e => setFile(e.target.files?.[0] || null)}
						/>
					</div>
					<Button type='submit' disabled={isLoading || !name.trim()} className='shrink-0'>
						<Plus />
						Добавить
						{isLoading && <Loader2 className='animate-spin' />}
					</Button>
				</div>
				{preview && (
					<div className='relative h-24 w-24 overflow-hidden rounded-md border bg-muted'>
						<Image src={preview} alt='' fill className='object-cover' unoptimized />
					</div>
				)}
			</form>

			<div className='space-y-2'>
				{items.length === 0 && <p className='text-sm text-muted-foreground'>Пока нет товаров в ожидании.</p>}
				<PurchaseItemList items={items} onApprove={onApprove} approvingId={approvingId} />
			</div>
		</div>
	)
}

export default PurchaseTodoList
