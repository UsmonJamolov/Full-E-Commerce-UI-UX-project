import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { products } from '@/lib/constants'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { formatPrice } from '@/lib/utils'
import { cookies } from 'next/headers'

const Page = async () => {
	const cookieStore = await cookies()
	const dict = getDictionary(parseLocale(cookieStore.get('locale')?.value))
	const d = dict.dashboard

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>{d.ordersTitle}</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>{d.ordersCaption}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>{d.colPrice}</TableHead>
						<TableHead>{d.colStatus}</TableHead>
						<TableHead>{d.colProduct}</TableHead>
						<TableHead>{d.colOrderTime}</TableHead>
						<TableHead className='text-right'>{d.colUpdatedTime}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow key={product._id}>
							<TableCell>{formatPrice(product.price)}</TableCell>
							<TableCell>{d.statusPaid}</TableCell>
							<TableCell>{product.title}</TableCell>
							<TableCell>10-Nov 2024</TableCell>
							<TableCell className='text-right'>12-Nov 12:30 pm</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
