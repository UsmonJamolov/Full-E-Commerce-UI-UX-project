'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const GROUPS = ['Erkak', 'Ayol', 'Bola'] as const

export default function ShoesTargetGroupFilters() {
	const searchParams = useSearchParams()
	const raw = searchParams.get('targetGroup')
	const active =
		raw && GROUPS.includes(raw as (typeof GROUPS)[number]) ? (raw as (typeof GROUPS)[number]) : null

	const hrefFor = (value: (typeof GROUPS)[number] | null) => {
		const p = new URLSearchParams(searchParams.toString())
		p.delete('page')
		if (value) p.set('targetGroup', value)
		else p.delete('targetGroup')
		const qs = p.toString()
		return qs ? `/shoes-products?${qs}` : '/shoes-products'
	}

	return (
		<div className='flex flex-wrap items-center gap-2 mt-5'>
			<span className='text-sm font-medium text-muted-foreground mr-1'>Guruh:</span>
			{GROUPS.map(g => (
				<Button key={g} asChild variant={active === g ? 'default' : 'outline'} size='sm' className={cn('min-w-[88px]')}>
					<Link href={hrefFor(g)}>{g}</Link>
				</Button>
			))}
			{active && (
				<Button asChild variant='ghost' size='sm'>
					<Link href={hrefFor(null)}>Barcha oyoq kiyimlar</Link>
				</Button>
			)}
		</div>
	)
}
