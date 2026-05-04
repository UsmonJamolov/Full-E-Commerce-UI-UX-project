'use client'

import { useI18n } from '@/components/providers/i18n-provider'
import { FC, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import { SafeUser } from "@/types"

interface Props {
	user: SafeUser
}
const UserBox: FC<Props> = ({ user }) => {
	const [open, setOpen] = useState(false)
	const { dictionary } = useI18n()
	const h = dictionary.header

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='h-10 w-10 cursor-pointer'>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className='capitalize bg-primary text-white'>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{h.userMenuLabel}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{user.role === 'admin' && (
						<DropdownMenuItem className='cursor-pointer' asChild>
							<Link href={'/admin/products'}>{h.userMenuAdmin}</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className='cursor-pointer' asChild>
						<Link href={'/dashboard'}>{h.userMenuDashboard}</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className='flex cursor-pointer items-center' onClick={() => setOpen(true)}>
						<LogOut className='mr-2 h-4 w-4 shrink-0' />
						<span>{h.userMenuLogout}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{h.logoutDialogTitle}</AlertDialogTitle>
						<AlertDialogDescription>{h.logoutDialogDescription}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{h.logoutDialogCancel}</AlertDialogCancel>
						<AlertDialogAction onClick={() => signOut({ callbackUrl: '/sign-in' })}>
							{h.logoutDialogContinue}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default UserBox