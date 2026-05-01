'use client'

import { updateNewArrivalSettingsAdmin, uploadFile, type NewArrivalCard } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SLOT_HINTS = ['Слева — большая карточка (основная)', 'Справа — верхняя длинная карточка', 'Справа снизу — левая маленькая', 'Справа снизу — правая маленькая']

type Props = {
	initialCards: NewArrivalCard[]
}

export default function NewArrivalForm({ initialCards }: Props) {
	const { isLoading, onError, setIsLoading } = useAction()
	const [cards, setCards] = useState<NewArrivalCard[]>(() =>
		initialCards.length === 4 ? initialCards.map(c => ({ ...c, imageKey: c.imageKey || '' })) : initialCards,
	)
	const [files, setFiles] = useState<(File | null)[]>([null, null, null, null])
	const [previews, setPreviews] = useState<string[]>(['', '', '', ''])

	useEffect(() => {
		const urls = files.map((f, i) => {
			if (!f) return ''
			return URL.createObjectURL(f)
		})
		setPreviews(urls)
		return () => {
			urls.forEach(u => {
				if (u) URL.revokeObjectURL(u)
			})
		}
	}, [files])

	const setCard = (index: number, patch: Partial<NewArrivalCard>) => {
		setCards(prev => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)))
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		const next: NewArrivalCard[] = cards.map(c => ({ ...c, imageKey: c.imageKey || '' }))

		for (let i = 0; i < 4; i++) {
			const f = files[i]
			if (!f) continue
			const uploaded = await uploadFile({
				file: f,
				fileName: f.name,
				fileType: f.type,
				fileSize: f.size,
			})
			if (!uploaded?.data?.url) {
				setIsLoading(false)
				return onError('Не удалось загрузить изображение')
			}
			next[i] = {
				...next[i],
				image: uploaded.data.url,
				imageKey: uploaded.data.key || '',
			}
		}

		const res = await updateNewArrivalSettingsAdmin({ cards: next })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Ошибка при сохранении')
		}
		const data = res.data as { failure?: string; cards?: NewArrivalCard[] }
		if (data.failure) {
			setIsLoading(false)
			return onError(data.failure)
		}
		if (data.cards?.length === 4) {
			setCards(data.cards.map(c => ({ ...c, imageKey: c.imageKey || '' })))
		}
		setFiles([null, null, null, null])
		setIsLoading(false)
		toast.success('Блок New Arrival обновлен')
	}

	return (
		<form onSubmit={onSubmit} className='mt-6 space-y-10'>
			{[0, 1, 2, 3].map(i => (
				<div key={i} className='rounded-lg border p-4 space-y-3'>
					<p className='text-sm font-semibold text-muted-foreground'>{SLOT_HINTS[i]}</p>
					<div className='grid gap-3 sm:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor={`na-title-${i}`}>Заголовок</Label>
							<Input
								id={`na-title-${i}`}
								value={cards[i]?.title || ''}
								onChange={e => setCard(i, { title: e.target.value })}
								required
							/>
						</div>
						<div className='space-y-2 sm:col-span-2'>
							<Label htmlFor={`na-desc-${i}`}>Описание</Label>
							<Textarea
								id={`na-desc-${i}`}
								value={cards[i]?.desc || ''}
								onChange={e => setCard(i, { desc: e.target.value })}
								rows={3}
								required
							/>
						</div>
						<div className='space-y-2 sm:col-span-2'>
							<Label htmlFor={`na-file-${i}`}>Новое изображение (опционально)</Label>
							<Input
								id={`na-file-${i}`}
								type='file'
								accept='image/*'
								onChange={e => {
									const f = e.target.files?.[0] || null
									setFiles(prev => {
										const copy = [...prev]
										copy[i] = f
										return copy
									})
								}}
							/>
						</div>
					</div>
					<div className='relative h-40 w-full max-w-xs rounded-md border bg-muted'>
						<Image
							src={previews[i] || cards[i]?.image || '/images/ps5.png'}
							alt={cards[i]?.title || `Kart ${i + 1}`}
							fill
							className='object-contain p-2'
							unoptimized
						/>
					</div>
				</div>
			))}
			<Button type='submit' disabled={isLoading}>
				{isLoading ? 'Сохранение…' : 'Сохранить'}
			</Button>
		</form>
	)
}
