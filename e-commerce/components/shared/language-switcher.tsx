'use client'

import { setLocale } from '@/actions/locale.action'
import type { Locale } from '@/lib/i18n/dictionaries'
import { locales } from '@/lib/i18n/dictionaries'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const labels: Record<Locale, string> = {
	en: 'English',
	ru: 'Русский',
	uz: 'Oʻzbek',
}

type Props = {
	current: Locale
	className?: string
	theme?: 'dark' | 'light'
}

export default function LanguageSwitcher({
	current,
	className,
	theme = 'dark',
}: Props) {
	const router = useRouter()
	const [pending, startTransition] = useTransition()
	const isDark = theme === 'dark'

	return (
		<div className={`relative flex items-center gap-1 ${className ?? ''}`}>
			<label htmlFor='site-locale' className='sr-only'>
				Language
			</label>
			<select
				id='site-locale'
				value={current}
				disabled={pending}
				onChange={e => {
					const next = e.target.value as Locale
					startTransition(() => {
						void setLocale(next).then(() => router.refresh())
					})
				}}
				className={`cursor-pointer appearance-none rounded border border-transparent bg-transparent py-0.5 pr-6 text-xs outline-none disabled:opacity-50 ${
					isDark
						? 'text-white focus-visible:ring-2 focus-visible:ring-white/40'
						: 'text-foreground focus-visible:ring-2 focus-visible:ring-black/20'
				}`}
			>
				{locales.map(code => (
					<option
						key={code}
						value={code}
						className={isDark ? 'bg-black text-white' : 'bg-white text-black'}
					>
						{labels[code]}
					</option>
				))}
			</select>
			<ChevronDown
				className={`pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 ${
					isDark ? 'text-white/80' : 'text-black/70'
				}`}
			/>
		</div>
	)
}
