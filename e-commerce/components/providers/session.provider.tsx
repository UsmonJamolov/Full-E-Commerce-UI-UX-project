'use client'

import { ChildProps } from '@/types'
import { SessionProvider as Session } from 'next-auth/react'
import { FC, Suspense } from 'react'
import { Session as NextAuthSession } from 'next-auth'

type Props = ChildProps & {
	session?: NextAuthSession | null
}

const SessionProvider: FC<Props> = ({ children, session }) => {
	return (
	 <Session session={session} refetchInterval={0} refetchOnWindowFocus={false}>
		<Suspense>{children}</Suspense>
	</Session>
	)
}

export default SessionProvider