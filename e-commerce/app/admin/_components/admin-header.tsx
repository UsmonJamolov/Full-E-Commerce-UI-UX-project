import UserBox from '@/components/shared/user-box'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const AdminHeader = async () => {
	const session = await getServerSession(authOptions)

	return (
		<header className='border-b bg-white'>
			<div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4'>
				<Link href='/' className='text-xl font-bold'>
					Exclusive Admin
				</Link>
				{session?.currentUser?._id ? (
					<UserBox user={session.currentUser} />
				) : (
					<Link href='/sign-in' className='text-sm font-medium text-muted-foreground hover:text-foreground'>
						Sign in
					</Link>
				)}
			</div>
		</header>
	)
}

export default AdminHeader
