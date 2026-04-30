'use client'

import { updateBuyNowSettingsAdmin, uploadFile } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAction } from '@/hooks/use-action'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	initialTargetDate: string
	initialImage?: string
	initialImageKey?: string
	initialTimerVisible?: boolean
	initialTimerPaused?: boolean
}

const toInputValue = (isoValue: string) => {
	if (!isoValue) return ''
	const date = new Date(isoValue)
	if (Number.isNaN(date.getTime())) return ''
	const y = date.getFullYear()
	const m = `${date.getMonth() + 1}`.padStart(2, '0')
	const d = `${date.getDate()}`.padStart(2, '0')
	const hh = `${date.getHours()}`.padStart(2, '0')
	const mm = `${date.getMinutes()}`.padStart(2, '0')
	return `${y}-${m}-${d}T${hh}:${mm}`
}

const BuyNowSettingsForm = ({
	initialTargetDate,
	initialImage = '',
	initialImageKey = '',
	initialTimerVisible = true,
	initialTimerPaused = false,
}: Props) => {
	const { isLoading, onError, setIsLoading } = useAction()
	const [value, setValue] = useState(toInputValue(initialTargetDate))
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState(initialImage)
	const [imageKey, setImageKey] = useState(initialImageKey)
	const [isTimerVisible, setIsTimerVisible] = useState(initialTimerVisible)
	const [isTimerPaused, setIsTimerPaused] = useState(initialTimerPaused)
	const [previewUrl, setPreviewUrl] = useState('')

	useEffect(() => {
		if (!selectedFile) {
			setPreviewUrl('')
			return
		}
		const objectUrl = URL.createObjectURL(selectedFile)
		setPreviewUrl(objectUrl)
		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!value) return onError('Vaqtni kiriting')

		setIsLoading(true)
		let finalImage = imageUrl
		let finalImageKey = imageKey

		if (selectedFile) {
			const uploaded = await uploadFile({
				file: selectedFile,
				fileName: selectedFile.name,
				fileType: selectedFile.type,
				fileSize: selectedFile.size,
			})

			if (!uploaded?.data?.url) {
				setIsLoading(false)
				return onError('Image upload failed')
			}

			finalImage = uploaded.data.url
			finalImageKey = uploaded.data.key
		}

		const res = await updateBuyNowSettingsAdmin({
			targetDate: new Date(value).toISOString(),
			image: finalImage,
			imageKey: finalImageKey,
			isTimerVisible,
			isTimerPaused,
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			setIsLoading(false)
			return onError(res.data.failure)
		}

		toast.success('Timer updated')
		setImageUrl(finalImage)
		setImageKey(finalImageKey)
		setSelectedFile(null)
		setIsLoading(false)
	}

	const onToggleVisibility = async () => {
		setIsLoading(true)
		const next = !isTimerVisible
		const res = await updateBuyNowSettingsAdmin({
			targetDate: new Date(value).toISOString(),
			isTimerVisible: next,
			isTimerPaused,
			image: imageUrl,
			imageKey,
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Something went wrong')
		}
		setIsTimerVisible(next)
		toast.success(next ? 'Timer ko‘rinadi' : 'Timer yashirildi')
		setIsLoading(false)
	}

	const onTogglePause = async () => {
		setIsLoading(true)
		const next = !isTimerPaused
		const res = await updateBuyNowSettingsAdmin({
			targetDate: new Date(value).toISOString(),
			isTimerVisible,
			isTimerPaused: next,
			image: imageUrl,
			imageKey,
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Something went wrong')
		}
		setIsTimerPaused(next)
		toast.success(next ? 'Timer to‘xtatildi' : 'Timer ishga tushdi')
		setIsLoading(false)
	}

	const previewSrc = previewUrl || imageUrl

	return (
		<form onSubmit={onSubmit} className='mt-4 flex flex-col gap-3 md:max-w-sm'>
			<Input type='datetime-local' value={value} onChange={e => setValue(e.target.value)} />
			<Input
				type='file'
				accept='image/*'
				onChange={e => setSelectedFile(e.target.files?.[0] || null)}
			/>
			{previewSrc && (
				<div className='relative h-40 w-full overflow-hidden rounded-md border bg-secondary'>
					<Image src={previewSrc} alt='Buy now preview' fill className='object-contain p-2' unoptimized />
				</div>
			)}
			<Button type='submit' disabled={isLoading}>
				Save timer
			</Button>
			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
				<Button type='button' variant='outline' disabled={isLoading} onClick={onToggleVisibility}>
					{isTimerVisible ? 'Timerni yashirish' : 'Timerni ko‘rsatish'}
				</Button>
				<Button type='button' variant='outline' disabled={isLoading} onClick={onTogglePause}>
					{isTimerPaused ? 'Timerni davom ettirish' : 'Timerni to‘xtatish'}
				</Button>
			</div>
		</form>
	)
}

export default BuyNowSettingsForm
