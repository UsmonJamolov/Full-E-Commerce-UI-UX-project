'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { updateHeaderSettingsAdmin } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'

type Props = {
	initialLocationLabel: string
}

export default function HeaderSettingsForm({ initialLocationLabel }: Props) {
	const { isLoading, setIsLoading, onError } = useAction()
	const [locationLabel, setLocationLabel] = useState(initialLocationLabel)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = locationLabel.trim()
		if (!trimmed) return

		setIsLoading(true)
		const res = await updateHeaderSettingsAdmin({ locationLabel: trimmed })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Ошибка при сохранении локации в хедере')
		}

		setIsLoading(false)
		toast.success('Локация в хедере обновлена')
	}

	return (
		<form onSubmit={onSubmit} className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h2 className='text-lg font-semibold'>Локация в хедере</h2>
				<p className='text-sm text-muted-foreground'>
					Измените текст локации в шапке (например: Tashkent, Moscow, Samarkand).
				</p>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='header-location'>Локация</Label>
				<Input
					id='header-location'
					value={locationLabel}
					onChange={e => setLocationLabel(e.target.value)}
					maxLength={120}
					required
				/>
			</div>

			<Button type='submit' disabled={isLoading || locationLabel.trim().length === 0}>
				{isLoading ? 'Сохранение...' : 'Сохранить'}
			</Button>
		</form>
	)
}
