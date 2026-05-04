'use client'

import { updateHomeSliderSettingsAdmin, uploadFile, type HomeSliderSlideAdmin } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SLOT_LABELS = ['Слайд 1', 'Слайд 2', 'Слайд 3', 'Слайд 4']

type Props = {
	initialSlides: HomeSliderSlideAdmin[]
}

export default function HomeSliderSettingsForm({ initialSlides }: Props) {
	const { isLoading, onError, setIsLoading } = useAction()
	const [slides, setSlides] = useState<HomeSliderSlideAdmin[]>(() =>
		initialSlides.length === 4
			? initialSlides.map(s => ({
					title: s.title,
					text: s.text,
					alt: s.alt || s.title,
					image: s.image,
					link: s.link,
				}))
			: initialSlides,
	)
	const [files, setFiles] = useState<(File | null)[]>([null, null, null, null])
	const [previews, setPreviews] = useState<string[]>(['', '', '', ''])

	useEffect(() => {
		const urls = files.map(f => (f ? URL.createObjectURL(f) : ''))
		setPreviews(urls)
		return () => {
			urls.forEach(u => {
				if (u) URL.revokeObjectURL(u)
			})
		}
	}, [files])

	const setSlide = (index: number, patch: Partial<HomeSliderSlideAdmin>) => {
		setSlides(prev => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)))
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		const next = slides.map(s => ({
			title: s.title.trim(),
			text: s.text.trim(),
			alt: (s.alt || s.title).trim(),
			image: s.image.trim(),
			link: s.link.trim(),
		}))

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
			next[i] = { ...next[i]!, image: uploaded.data.url }
		}

		const res = await updateHomeSliderSettingsAdmin({ slides: next })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Ошибка при сохранении')
		}
		const data = res.data as { failure?: string; slides?: HomeSliderSlideAdmin[] }
		if (data.failure) {
			setIsLoading(false)
			return onError(data.failure)
		}
		if (data.slides?.length === 4) {
			setSlides(
				data.slides.map(s => ({
					title: s.title,
					text: s.text,
					alt: s.alt || s.title,
					image: s.image,
					link: s.link,
				})),
			)
		}
		setFiles([null, null, null, null])
		setIsLoading(false)
		toast.success('Слайдер главной страницы обновлён')
	}

	return (
		<div className='rounded-lg border bg-white p-4'>
			<div>
				<h2 className='text-lg font-semibold'>Слайдер на главной</h2>
				<p className='mt-1 text-sm text-muted-foreground'>
					Четыре баннера рядом с категориями: заголовок, текст, ссылка «Купить сейчас», картинка (URL или
					загрузка).
				</p>
			</div>
			<form onSubmit={onSubmit} className='mt-6 space-y-10'>
				{[0, 1, 2, 3].map(i => (
					<div key={i} className='space-y-3 rounded-lg border p-4'>
						<p className='text-sm font-semibold text-muted-foreground'>{SLOT_LABELS[i]}</p>
						<div className='grid gap-3 sm:grid-cols-2'>
							<div className='space-y-2'>
								<Label htmlFor={`hs-title-${i}`}>Заголовок (верхняя строка)</Label>
								<Input
									id={`hs-title-${i}`}
									value={slides[i]?.title || ''}
									onChange={e => setSlide(i, { title: e.target.value })}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor={`hs-link-${i}`}>Ссылка кнопки</Label>
								<Input
									id={`hs-link-${i}`}
									value={slides[i]?.link || ''}
									onChange={e => setSlide(i, { link: e.target.value })}
									placeholder='/explore-products'
									required
								/>
							</div>
							<div className='space-y-2 sm:col-span-2'>
								<Label htmlFor={`hs-text-${i}`}>Описание (основной текст)</Label>
								<Textarea
									id={`hs-text-${i}`}
									value={slides[i]?.text || ''}
									onChange={e => setSlide(i, { text: e.target.value })}
									rows={3}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor={`hs-alt-${i}`}>Alt изображения</Label>
								<Input
									id={`hs-alt-${i}`}
									value={slides[i]?.alt || ''}
									onChange={e => setSlide(i, { alt: e.target.value })}
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor={`hs-img-${i}`}>URL изображения</Label>
								<Input
									id={`hs-img-${i}`}
									value={slides[i]?.image || ''}
									onChange={e => setSlide(i, { image: e.target.value })}
									required
								/>
							</div>
							<div className='space-y-2 sm:col-span-2'>
								<Label htmlFor={`hs-file-${i}`}>Новое изображение (опционально)</Label>
								<Input
									id={`hs-file-${i}`}
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
						{(previews[i] || slides[i]?.image) && (
							<div className='relative mt-2 aspect-[21/9] max-h-40 w-full max-w-xl overflow-hidden rounded-md border bg-zinc-950'>
								<Image
									src={previews[i] || slides[i]?.image || ''}
									alt=''
									fill
									className='object-contain object-center p-2'
									unoptimized={Boolean(previews[i] || (slides[i]?.image || '').startsWith('http'))}
								/>
							</div>
						)}
					</div>
				))}
				<Button type='submit' disabled={isLoading} className='flex w-full items-center gap-2 sm:w-auto'>
					{isLoading ? 'Сохранение…' : 'Сохранить слайдер'}
				</Button>
			</form>
		</div>
	)
}
