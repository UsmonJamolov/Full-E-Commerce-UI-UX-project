import { ChildProps } from '@/types'
import { FC } from 'react'
import AdminHeader from './_components/admin-header'
import Sidebar from './_components/sidebar'

const Layout: FC<ChildProps> = ({ children }) => {
	return (
		<div data-admin-layout>
			<AdminHeader />
			<div className='mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[260px_minmax(0,1fr)]'>
				<aside className='md:sticky md:top-20 md:h-fit'>
					<Sidebar />
				</aside>
				<main>{children}</main>
			</div>
		</div>
	)
}

export default Layout