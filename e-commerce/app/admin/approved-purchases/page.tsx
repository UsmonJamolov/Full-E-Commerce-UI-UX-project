import { getPurchaseItems } from '@/actions/admin.aciton'
import PurchaseItemList from '../_components/purchase-item-list'

const ApprovedPurchasesPage = async () => {
	const res = await getPurchaseItems({ status: 'approved' })
	const items = res?.data?.items || []

	return (
		<div className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h1 className='text-2xl font-bold'>Sotib olishga tasdiqlangan tovarlar</h1>
				<p className='text-sm text-muted-foreground'>
					Orders bo‘limida ko‘rib chiqilib tasdiqlangan tovarlar ro‘yxati.
				</p>
			</div>
			<div className='space-y-2'>
				{items.length === 0 && <p className='text-sm text-muted-foreground'>Hozircha tasdiqlangan tovar yo‘q.</p>}
				<PurchaseItemList items={items} />
			</div>
		</div>
	)
}

export default ApprovedPurchasesPage
