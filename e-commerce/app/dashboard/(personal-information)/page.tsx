import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import EditInformation from '../_components/edit-information'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { IUser } from '@/types'

const Page = async () => {
	const session = await getServerSession(authOptions)

	const serializedUser = session?.currentUser
		? (JSON.parse(JSON.stringify(session.currentUser)) as IUser)
		: null

	return (
		<>
			<h1 className='text-xl font-semibold'>Personal information</h1>
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