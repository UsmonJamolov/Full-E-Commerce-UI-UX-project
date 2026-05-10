import CreateDelegatedAdminForm from './create-delegated-admin-form'
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

	return (
		<div className='space-y-4'>
			<div>
				<h1 className='text-2xl font-bold'>{dict.admin.createAdminTitle}</h1>
				<p className='text-sm text-muted-foreground'>{dict.admin.adminsNavLabel}</p>
			</div>
			<CreateDelegatedAdminForm />
		</div>
	)
}
