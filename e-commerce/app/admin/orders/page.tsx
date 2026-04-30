import { getPurchaseItems } from '@/actions/admin.aciton'
import PurchaseTodoList from '../_components/purchase-todo-list'

const AdminOrdersPage = async () => {
	const res = await getPurchaseItems({ status: 'pending' })
	const items = res?.data?.items || []

	return <PurchaseTodoList items={items} />
}

export default AdminOrdersPage
