import CreateDelegatedAdminForm from './create-delegated-admin-form'
import DelegatedAdminsTable from './delegated-admins-table'
import { getDelegatedAdmins } from '@/actions/admin.aciton'
import { authOptions } from '@/lib/auth-options'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminAdminsPage() {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser || session.currentUser.role !== 'admin') {
		redirect('/sign-in')
	}
	if (!session.currentUser.managesAdmins) {
		redirect('/admin/products')
	}
	const store = await cookies()
	const dict = getDictionary(parseLocale(store.get('locale')?.value))
	const adminsRes = await getDelegatedAdmins()
	const admins = adminsRes?.data?.admins ?? []

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold'>{dict.admin.createAdminTitle}</h1>
				<p className='text-sm text-muted-foreground'>{dict.admin.createAdminLead}</p>
			</div>
			<CreateDelegatedAdminForm />

			<div className='space-y-3'>
				<div>
					<h2 className='text-xl font-semibold'>{dict.admin.delegatedAdminsSectionTitle}</h2>
					<p className='text-sm text-muted-foreground'>{dict.admin.delegatedAdminsSectionLead}</p>
				</div>
				<DelegatedAdminsTable admins={admins} />
			</div>
		</div>
	)
}
