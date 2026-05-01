'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { categories } from '@/lib/constants'
import { cn, formUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import { FC, Suspense, useEffect, useMemo } from 'react'

interface Props {
	showCategory?: boolean
	categoryOptions?: string[]
}

function FilterFallback({ showCategory }: Pick<Props, 'showCategory'>) {
	return (
		<div
			className={cn(
				'grid max-md:w-full gap-1',
				showCategory ? 'grid-cols-3' : 'grid-cols-2',
			)}
		>
			<div className='flex h-9 items-center rounded-md border bg-secondary max-md:w-1/2' />
			<div className='h-9 rounded-md border bg-secondary max-md:w-1/2' />
			{showCategory && <div className='h-9 rounded-md border bg-secondary max-md:w-1/2' />}
		</div>
	)
}

function FilterInner({ showCategory, categoryOptions = categories }: Props) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const paramsString = searchParams.toString()

	const onFilterChange = (value: string) => {
		const newUrl = formUrlQuery({ key: 'filter', params: paramsString, value })
		router.push(newUrl)
	}

	const onCategoryChange = (value: string) => {
		if (value === 'all') {
			const newUrl = removeUrlQuery({ key: 'category', params: paramsString })
			router.push(newUrl)
			return
		}
		const newUrl = formUrlQuery({ key: 'category', params: paramsString, value })
		router.push(newUrl)
	}

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				if (value === '') {
					const newUrl = removeUrlQuery({ key: 'q', params: paramsString })
					router.push(newUrl)
					return
				}
				const newUrl = formUrlQuery({ key: 'q', params: paramsString, value })
				router.push(newUrl)
			}, 300),
		[router, paramsString],
	)

	useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch])

	return (
		<div className={cn('gap-1 max-md:w-full grid', showCategory ? 'grid-cols-3' : 'grid-cols-2')}>
			<div className='flex items-center bg-secondary max-md:w-1/2 border'>
				<Input
					placeholder='Qidirish'
					className='text-xs border-none no-focus'
					onChange={e => debouncedSearch(e.target.value)}
				/>
				<Search className='mr-2 cursor-pointer text-muted-foreground' />
			</div>

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='bg-secondary text-xs max-md:w-1/2'>
					<SelectValue placeholder='Select filter' className='text-muted-foreground' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='newest'>Newest</SelectItem>
					<SelectItem value='oldest'>Oldest</SelectItem>
				</SelectContent>
			</Select>
			{showCategory && (
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className='bg-secondary text-xs max-md:w-1/2'>
						<SelectValue placeholder='Select category' className='text-muted-foreground' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All category</SelectItem>
						{categoryOptions.map(category => (
							<SelectItem value={category} key={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}

const Filter: FC<Props> = props => {
	return (
		<Suspense fallback={<FilterFallback showCategory={props.showCategory} />}>
			<FilterInner {...props} />
		</Suspense>
	)
}

export default Filter
