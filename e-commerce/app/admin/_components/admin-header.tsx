import AdminHeaderBar from './admin-header-bar'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'

const AdminHeader = async () => {
	const session = await getServerSession(authOptions)
	return <AdminHeaderBar user={session?.currentUser ?? null} />
}

export default AdminHeader
