import { ChildProps } from '@/types'
import { FC } from 'react'
import Sidebar from './_components/sidebar'

const Layout: FC<ChildProps> = ({ children }) => {
	return (
		<div className='grid min-h-[78vh] grid-cols-3 gap-4 pb-20'>
			<div className='col-span-1'>
				<Sidebar />
			</div>
			<div className='col-span-2'>{children}</div>
		</div>
	)
}

export default Layout