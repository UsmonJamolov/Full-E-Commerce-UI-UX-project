'use client'

import { setLocale } from '@/actions/locale.action'
import type { Locale } from '@/lib/i18n/dictionaries'
import { locales } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'
import { ChevronDown, Globe, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
	const [menuOpen, setMenuOpen] = useState(false)
	const [dropdownReady, setDropdownReady] = useState(false)
	const isDark = theme === 'dark'

	useEffect(() => {
		setDropdownReady(true)
	}, [])

	const onLocaleChange = (value: string) => {
		const next = value as Locale
		if (next === current) return
		startTransition(() => {
			void setLocale(next).then(() => router.refresh())
		})
	}

	const triggerClass = cn(
		'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition disabled:opacity-60',
		'focus-visible:ring-2 focus-visible:ring-offset-2',
		isDark
			? 'border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/12 focus-visible:ring-orange-400/90 focus-visible:ring-offset-black'
			: 'border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 focus-visible:ring-red-500/40 focus-visible:ring-offset-white',
		className,
	)

	const triggerInner = (
		<>
			<Globe
				className={cn('h-3.5 w-3.5 shrink-0 transition', isDark ? 'text-orange-400/90' : 'text-red-600')}
				aria-hidden
			/>
			<span className='max-w-[7rem] truncate sm:max-w-none'>{labels[current]}</span>
			{pending ? (
				<Loader2 className='h-3.5 w-3.5 shrink-0 animate-spin opacity-80' aria-hidden />
			) : (
				<ChevronDown
					className={cn(
						'h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200',
						menuOpen && 'rotate-180',
						isDark ? 'text-white/80' : 'text-zinc-600',
					)}
					aria-hidden
				/>
			)}
		</>
	)

	if (!dropdownReady) {
		return (
			<button type='button' className={triggerClass} disabled aria-label='Language'>
				{triggerInner}
			</button>
		)
	}

	return (
		<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
			<DropdownMenuTrigger disabled={pending} className={triggerClass} aria-label='Language'>
				{triggerInner}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				sideOffset={8}
				className={cn(
					'min-w-[10.5rem] overflow-hidden rounded-xl border p-1.5 shadow-xl',
					isDark
						? 'border-white/12 bg-zinc-950 text-zinc-100 shadow-black/40'
						: 'border-zinc-200/80 bg-white text-zinc-900',
				)}
			>
				<DropdownMenuRadioGroup value={current} onValueChange={onLocaleChange}>
					{locales.map(code => (
						<DropdownMenuRadioItem
							key={code}
							value={code}
							disabled={pending}
							className={cn(
								'cursor-pointer rounded-lg border border-transparent py-2 pl-8 pr-2 text-sm font-medium transition',
								isDark
									? 'text-zinc-200 focus:bg-white/10 focus:text-white data-[state=checked]:border-red-500/35 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600/25 data-[state=checked]:to-orange-500/20'
									: 'focus:bg-zinc-100 data-[state=checked]:border-red-200 data-[state=checked]:bg-red-50',
							)}
						>
							{labels[code]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
