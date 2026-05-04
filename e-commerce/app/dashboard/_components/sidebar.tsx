'use client'

import { useI18n } from '@/components/providers/i18n-provider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { dashboardSidebar, type DashboardNavKey } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLabel = (key: DashboardNavKey, d: ReturnType<typeof useI18n>['dictionary']['dashboard']) => {
	switch (key) {
		case 'personal':
			return d.navPersonal
		case 'watchList':
			return d.navWatchList
		case 'settings':
			return d.navSettings
	}
}

const Sidebar = () => {
	const pathname = usePathname()
	const { dictionary } = useI18n()
	const d = dictionary.dashboard

	return (
		<div className='p-4 shadow-lg'>
			<h1 className='font-semibold'>{d.sidebarTitle}</h1>
			<Separator />
			<div className='flex flex-col mt-2'>
				{dashboardSidebar.map(item => (
					<Button
						key={item.route}
						asChild
						variant={pathname == item.route ? 'secondary' : 'ghost'}
						className={cn('flex justify-start', pathname == item.route && 'font-bold')}
					>
						<Link href={item.route}>
							<item.icon />
							<span>{navLabel(item.navKey, d)}</span>
						</Link>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Sidebar