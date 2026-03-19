import { ChildProps } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

const AuthLayout: FC<ChildProps> = ({ children }) => {
	return <section className='flex justify-center gap-4'>
				{children}
			</section>
}

export default AuthLayout