'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { adminSidebar } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	const locale = useMemo<'ru' | 'en' | 'uz'>(() => {
		if (typeof document === 'undefined') return 'ru'
		const matched = document.cookie.match(/(?:^|;\s*)locale=(ru|en|uz)/)
		return (matched?.[1] as 'ru' | 'en' | 'uz' | undefined) || 'ru'
	}, [])
	const panelTitle = locale === 'en' ? 'Admin panel' : locale === 'uz' ? 'Admin panel' : 'Админ-панель'

	return (
		<div className='p-4 shadow-lg'>
			<h1 className='font-semibold'>{panelTitle}</h1>
			<Separator />
			<div className='flex flex-col mt-2'>
				{adminSidebar.map(item => (
					<Button
						key={item.route}
						asChild
						variant={pathname == item.route ? 'secondary' : 'ghost'}
						className={cn('flex justify-start', pathname == item.route && 'font-bold')}
					>
						<Link href={item.route}>
							<item.icon />
							<span>{item.name[locale]}</span>
						</Link>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Sidebar