'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const GROUP_KEYS = ['Erkak', 'Ayol', 'Bola'] as const

type TargetGroups = { Erkak: string; Ayol: string; Bola: string }

type Props = {
	groupLabel: string
	allFootwear: string
	targetGroups: TargetGroups
}

export default function ShoesTargetGroupFilters({ groupLabel, allFootwear, targetGroups }: Props) {
	const searchParams = useSearchParams()
	const raw = searchParams.get('targetGroup')
	const active =
		raw && GROUP_KEYS.includes(raw as (typeof GROUP_KEYS)[number])
			? (raw as (typeof GROUP_KEYS)[number])
			: null

	const hrefFor = (value: (typeof GROUP_KEYS)[number] | null) => {
		const p = new URLSearchParams(searchParams.toString())
		p.delete('page')
		if (value) p.set('targetGroup', value)
		else p.delete('targetGroup')
		const qs = p.toString()
		return qs ? `/shoes-products?${qs}` : '/shoes-products'
	}

	return (
		<div className='mt-5 flex flex-wrap items-center gap-2'>
			<span className='mr-1 text-sm font-medium text-muted-foreground'>{groupLabel}:</span>
			{GROUP_KEYS.map(g => (
				<Button key={g} asChild variant={active === g ? 'default' : 'outline'} size='sm' className={cn('min-w-[88px]')}>
					<Link href={hrefFor(g)}>{targetGroups[g]}</Link>
				</Button>
			))}
			{active && (
				<Button asChild variant='ghost' size='sm'>
					<Link href={hrefFor(null)}>{allFootwear}</Link>
				</Button>
			)}
		</div>
	)
}
