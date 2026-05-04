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
				<h1 className='text-xl font-bold'>{d.paymentsTitle}</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>{d.paymentsCaption}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>{d.paymentsColProduct}</TableHead>
						<TableHead>{d.paymentsColProvider}</TableHead>
						<TableHead>{d.paymentsColStatus}</TableHead>
						<TableHead className='text-right'>{d.paymentsColPrice}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow key={product._id}>
							<TableCell>{product.title}</TableCell>
							<TableCell>{d.paymentsProviderClick}</TableCell>
							<TableCell>{d.statusPaid}</TableCell>
							<TableCell className='text-right'>{formatPrice(product.price)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
