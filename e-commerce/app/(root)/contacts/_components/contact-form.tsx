'use client'

import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Dictionary } from '@/lib/i18n/dictionaries'

type Copy = Dictionary['contacts']

function openMailto(copy: Copy, supportEmail: string, name: string, email: string, subject: string, message: string) {
	const body = `${copy.fieldName}: ${name}\n${copy.fieldEmail}: ${email}\n\n${message}`
	const href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject || copy.fieldSubject)}&body=${encodeURIComponent(body)}`
	window.location.href = href
}

export default function ContactForm({ copy, supportEmail }: { copy: Copy; supportEmail: string }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [sending, setSending] = useState(false)

	const resetForm = () => {
		setName('')
		setEmail('')
		setSubject('')
		setMessage('')
	}

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setSending(true)
		try {
			const res = await fetch('/api/contact/telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					subject: subject.trim(),
					message: message.trim(),
				}),
			})

			const data = (await res.json().catch(() => ({}))) as {
				ok?: boolean
				code?: string
			}

			if (data.ok === true) {
				resetForm()
				toast.success(copy.toastContactSent)
				setSending(false)
				return
			}

			if (data.code === 'NOT_CONFIGURED') {
				openMailto(copy, supportEmail, name, email, subject, message)
				resetForm()
				toast.info(copy.toastContactMailFallback)
				setSending(false)
				return
			}

			toast.error(copy.toastContactError)
		} catch {
			toast.error(copy.toastContactError)
		}
		setSending(false)
	}

	return (
		<form
			onSubmit={onSubmit}
			className='rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8'
		>
			<div className='grid gap-4 sm:grid-cols-2'>
				<div className='space-y-2'>
					<Label htmlFor='cf-name' className='text-sm font-medium text-zinc-800'>
						{copy.fieldName}
					</Label>
					<Input
						id='cf-name'
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder={copy.phName}
						autoComplete='name'
						className='h-11 border-zinc-200 bg-zinc-50/50'
						required
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='cf-email' className='text-sm font-medium text-zinc-800'>
						{copy.fieldEmail}
					</Label>
					<Input
						id='cf-email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder={copy.phEmail}
						autoComplete='email'
						className='h-11 border-zinc-200 bg-zinc-50/50'
						required
					/>
				</div>
			</div>
			<div className='mt-4 space-y-2'>
				<Label htmlFor='cf-subject' className='text-sm font-medium text-zinc-800'>
					{copy.fieldSubject}
				</Label>
				<Input
					id='cf-subject'
					value={subject}
					onChange={e => setSubject(e.target.value)}
					placeholder={copy.phSubject}
					className='h-11 border-zinc-200 bg-zinc-50/50'
				/>
			</div>
			<div className='mt-4 space-y-2'>
				<Label htmlFor='cf-msg' className='text-sm font-medium text-zinc-800'>
					{copy.fieldMessage}
				</Label>
				<Textarea
					id='cf-msg'
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder={copy.phMessage}
					rows={5}
					required
					className='min-h-[140px] resize-y border-zinc-200 bg-zinc-50/50'
				/>
			</div>
			<div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6'>
				<Button
					type='submit'
					disabled={sending}
					className='inline-flex h-auto min-h-11 w-full max-w-full shrink-0 flex-wrap items-center justify-center gap-2 whitespace-normal rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold leading-snug text-white shadow-md hover:opacity-[0.96] sm:w-auto sm:min-w-[12rem] sm:max-w-[min(100%,18rem)]'
				>
					<Send className='h-4 w-4 shrink-0' aria-hidden />
					<span className='text-center'>{sending ? '…' : copy.submit}</span>
				</Button>
				<p className='min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground sm:max-w-[20rem] sm:pt-1 sm:text-right'>
					{copy.formNote}
				</p>
			</div>
		</form>
	)
}
