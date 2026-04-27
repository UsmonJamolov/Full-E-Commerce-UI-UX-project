'use client'

import { ChildProps } from '@/types'
import { SessionProvider as Session } from 'next-auth/react'
import { FC, Suspense } from 'react'

const SessionProvider: FC<ChildProps> = ({ children }) => {
	return (
	 <Session>
		<Suspense>{children}</Suspense>
	</Session>
	)
}

export default SessionProvider