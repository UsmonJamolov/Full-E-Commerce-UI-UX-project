'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { updateFooterSettingsAdmin } from '@/actions/admin.aciton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from '@/hooks/use-action'

type Props = {
	initialPhonePrimary: string
	initialPhoneSecondary: string
	initialSupportHours: string
	initialEmail: string
	initialTelegramUrl: string
	initialMaxMessengerUrl: string
	initialBrandBlurb: string
}

export default function FooterSettingsForm({
	initialPhonePrimary,
	initialPhoneSecondary,
	initialSupportHours,
	initialEmail,
	initialTelegramUrl,
	initialMaxMessengerUrl,
	initialBrandBlurb,
}: Props) {
	const { isLoading, setIsLoading, onError } = useAction()
	const [phonePrimary, setPhonePrimary] = useState(initialPhonePrimary)
	const [phoneSecondary, setPhoneSecondary] = useState(initialPhoneSecondary)
	const [supportHours, setSupportHours] = useState(initialSupportHours)
	const [email, setEmail] = useState(initialEmail)
	const [telegramUrl, setTelegramUrl] = useState(initialTelegramUrl)
	const [maxMessengerUrl, setMaxMessengerUrl] = useState(initialMaxMessengerUrl)
	const [brandBlurb, setBrandBlurb] = useState(initialBrandBlurb)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		const res = await updateFooterSettingsAdmin({
			phonePrimary: phonePrimary.trim(),
			phoneSecondary: phoneSecondary.trim(),
			supportHours: supportHours.trim(),
			email: email.trim(),
			telegramUrl: telegramUrl.trim(),
			maxMessengerUrl: maxMessengerUrl.trim(),
			brandBlurb: brandBlurb.trim(),
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Ошибка сохранения настроек footer')
		}
		setIsLoading(false)
		toast.success('Настройки footer обновлены')
	}

	return (
		<form onSubmit={onSubmit} className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h2 className='text-lg font-semibold'>Настройки footer</h2>
				<p className='text-sm text-muted-foreground'>Изменяйте контактные данные и ссылки в футере сайта.</p>
			</div>
			<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
				<div className='space-y-2'>
					<Label htmlFor='footer-phone-1'>Телефон 1</Label>
					<Input id='footer-phone-1' value={phonePrimary} onChange={e => setPhonePrimary(e.target.value)} required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='footer-phone-2'>Телефон 2</Label>
					<Input id='footer-phone-2' value={phoneSecondary} onChange={e => setPhoneSecondary(e.target.value)} required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='footer-hours'>Время поддержки</Label>
					<Input id='footer-hours' value={supportHours} onChange={e => setSupportHours(e.target.value)} required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='footer-email'>Email</Label>
					<Input id='footer-email' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='footer-telegram'>Telegram URL</Label>
					<Input id='footer-telegram' type='url' value={telegramUrl} onChange={e => setTelegramUrl(e.target.value)} required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='footer-max'>Max URL</Label>
					<Input id='footer-max' type='url' value={maxMessengerUrl} onChange={e => setMaxMessengerUrl(e.target.value)} required />
				</div>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='footer-brand'>Описание бренда</Label>
				<Textarea id='footer-brand' value={brandBlurb} onChange={e => setBrandBlurb(e.target.value)} rows={3} required />
			</div>
			<Button type='submit' disabled={isLoading}>
				{isLoading ? 'Сохранение...' : 'Сохранить настройки footer'}
			</Button>
		</form>
	)
}
