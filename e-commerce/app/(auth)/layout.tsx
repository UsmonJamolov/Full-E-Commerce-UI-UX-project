// import { ChildProps } from '@/types'
// import Image from 'next/image'
// import { FC } from 'react'

// const AuthLayout: FC<ChildProps> = ({ children }) => {
// 	return (
// 		<div className="hidden md:flex items-center justify-center ">
// 		<div className="bg-[#EAF4FA]">
			
// 		</div>
//           <Image
//             src="/images/signup-banner.png"
//             alt="Register visual"
//             width={420}
//             height={420}
//             priority
//             unoptimized
//             className="object-contain w-full h-full"
//           />
// 			<section className='flex justify-center gap-4'>
// 				{children}
// 			</section>
// 		</div>
// 	)
// }

// export default AuthLayout

import { ChildProps } from '@/types'
import { FC } from 'react'

const AuthLayout: FC<ChildProps> = ({ children }) => {
	return (
		<section className='flex min-h-[calc(100vh-120px)] w-full items-start justify-center bg-gradient-to-b from-background via-background to-muted/40 px-4 pb-10 pt-8 md:pt-12 md:pb-14'>
			<div className='w-full max-w-xl'>{children}</div>
		</section>
	)
}

export default AuthLayout