import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import EditInformation from '../_components/edit-information'
import { authOptions } from '@/lib/auth-options'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { IUser } from '@/types'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'

const Page = async () => {
	const [session, cookieStore] = await Promise.all([getServerSession(authOptions), cookies()])
	const dict = getDictionary(parseLocale(cookieStore.get('locale')?.value))

	const serializedUser = session?.currentUser
		? (JSON.parse(JSON.stringify(session.currentUser)) as IUser)
		: null

	return (
		<>
			<h1 className='text-xl font-semibold'>{dict.dashboard.personalInfoPageTitle}</h1>
			<Separator className='my-3' />
			{serializedUser ? (
				<EditInformation user={serializedUser} />
			) : (
				<div className='space-y-4'>
					<Skeleton className='h-52 w-full rounded-md' />
					<Skeleton className='h-24 w-full rounded-md' />
				</div>
			)}
		</>
	)
}

export default Page