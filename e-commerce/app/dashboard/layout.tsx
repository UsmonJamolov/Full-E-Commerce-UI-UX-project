import { ChildProps } from '@/types'
import { FC } from 'react'
import Sidebar from './_components/sidebar'

const Layout: FC<ChildProps> = ({ children }) => {
	return (
		<div className='grid min-h-[78vh] grid-cols-1 gap-6 pb-20 md:grid-cols-3 md:gap-4'>
			<div className='min-w-0 md:col-span-1'>
				<Sidebar />
			</div>
			<div className='min-w-0 md:col-span-2'>{children}</div>
		</div>
	)
}

export default Layout