import { ChildProps } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

const AuthLayout: FC<ChildProps> = ({ children }) => {
	return <section className='flex justify-center gap-4 mt-44'>
				<Image src={'/auth-image.jpg'} width={400} height={100} alt='auth-image' />
				{children}
			</section>
}

export default AuthLayout