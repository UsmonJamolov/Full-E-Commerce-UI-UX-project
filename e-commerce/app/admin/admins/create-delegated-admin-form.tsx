'use client'

import { createDelegatedAdmin } from '@/actions/admin.aciton'
import { useI18n } from '@/components/providers/i18n-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { toast } from 'sonner'

function normalizePhoneDigits(value: string) {
	let cleaned = value.replace(/[^\d+]/g, '')
	if (cleaned.includes('+')) {
		cleaned = '+' + cleaned.replace(/\+/g, '')
	}
	return cleaned
}

export default function CreateDelegatedAdminForm() {
	const { dictionary } = useI18n()
	const t = dictionary.auth.adminSignUp
	const a = dictionary.admin

	const [name, setName] = useState('')
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			toast.error(t.toastPasswordMismatch)
			return
		}
		setIsLoading(true)
		try {
			const res = await createDelegatedAdmin({
				name: name.trim(),
				login: login.trim(),
				password,
				confirmPassword,
			})

			if (res?.validationErrors) {
				toast.error(t.toastRegisterFailed)
				return
			}
			if (res?.serverError || !res?.data) {
				toast.error(typeof res?.serverError === 'string' ? res.serverError : t.toastRegisterFailed)
				return
			}
			const data = res.data as { success?: boolean; message?: string }
			if (data.success !== true) {
				toast.error(data.message || t.toastRegisterFailed)
				return
			}
			toast.success(a.createAdminSuccess)
			setName('')
			setLogin('')
			setPassword('')
			setConfirmPassword('')
		} catch {
			toast.error(t.toastRegisterFailed)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='rounded-lg border bg-white p-4 md:p-6'>
			<h2 className='text-xl font-semibold'>{a.createAdminTitle}</h2>
			<p className='mt-2 text-sm text-muted-foreground'>{a.createAdminLead}</p>
			<Separator className='my-6' />
			<div className='mx-auto max-w-md space-y-4'>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>{t.nameLabel}</label>
					<Input
						type='text'
						autoComplete='name'
						placeholder={a.createAdminNamePh}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>{t.loginLabel}</label>
					<Input
						type='text'
						autoComplete='username'
						placeholder={a.createAdminLoginPh}
						value={login}
						onChange={e => {
							const v = e.target.value
							setLogin(v.includes('@') ? v : normalizePhoneDigits(v))
						}}
					/>
				</div>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>{t.passwordLabel}</label>
					<Input
						type='password'
						autoComplete='new-password'
						placeholder={t.passwordPlaceholder}
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>{t.confirmLabel}</label>
					<Input
						type='password'
						autoComplete='new-password'
						placeholder={t.confirmPlaceholder}
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</div>
				<Button type='button' className='w-full bg-red-500 hover:bg-red-600' onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? t.submitting : a.createAdminSubmit}
				</Button>
			</div>
		</div>
	)
}
