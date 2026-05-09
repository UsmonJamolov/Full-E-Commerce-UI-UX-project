'use client'

import { useI18n } from '@/components/providers/i18n-provider'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { categories } from '@/lib/constants'
import { categoryFromCatalog } from '@/lib/i18n/catalog-labels'
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
				'grid w-full gap-2',
				showCategory ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2',
			)}
		>
			<div className='flex h-10 items-center rounded-md border bg-secondary' />
			<div className='h-10 rounded-md border bg-secondary' />
			{showCategory && <div className='h-10 rounded-md border bg-secondary' />}
		</div>
	)
}

function FilterInner({ showCategory, categoryOptions = categories }: Props) {
	const { dictionary } = useI18n()
	const f = dictionary.filter
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

	const cat = dictionary.catalog

	return (
		<div
			className={cn(
				'grid w-full min-w-0 gap-2',
				showCategory ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2',
			)}
		>
			<div className='flex min-w-0 items-center rounded-md border bg-secondary'>
				<Input
					placeholder={f.searchPlaceholder}
					className='h-10 min-w-0 flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0'
					onChange={e => debouncedSearch(e.target.value)}
				/>
				<Search className='mr-2 shrink-0 cursor-pointer text-muted-foreground' />
			</div>

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='h-10 w-full min-w-0 bg-secondary text-sm'>
					<SelectValue placeholder={f.filterPlaceholder} className='text-muted-foreground' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='newest'>{f.newest}</SelectItem>
					<SelectItem value='oldest'>{f.oldest}</SelectItem>
				</SelectContent>
			</Select>
			{showCategory && (
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className='h-10 w-full min-w-0 bg-secondary text-sm'>
						<SelectValue placeholder={f.categoryPlaceholder} className='text-muted-foreground' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>{f.allCategories}</SelectItem>
						{categoryOptions.map(category => (
							<SelectItem value={category} key={category}>
								{categoryFromCatalog(cat, category)}
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
