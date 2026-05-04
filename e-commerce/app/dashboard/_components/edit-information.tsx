'use client'

import { useI18n } from '@/components/providers/i18n-provider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit2, Loader } from 'lucide-react'
import EmailForm from './email.form'
import FullNameForm from './full-name.form'
import { IUser } from '@/types'
import { FC, useState } from 'react'
import {useAction} from '@/hooks/use-action'
import { updateUser } from '@/actions/user.action'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Uploader } from '@/components/Uploader'

interface Props {
	user: IUser
}

const EditInformation: FC<Props> = ({user}) => {
	const [open, setOpen] = useState(false)
	const { dictionary } = useI18n()
	const d = dictionary.dashboard

	const {update} = useSession()
	const {isLoading, onError, setIsLoading} = useAction()

	const onUpdateAvatar = async (avatar: string, avatarKey: string) => {
		setIsLoading(true)
		const res = await updateUser({avatar, avatarKey})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError(d.genericError)
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast(d.avatarUpdated)
			update()
			setOpen(false)
			setIsLoading(false)
		}
	}
	
	return (
		<>
			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					{isLoading && (
						<Skeleton className='absolute inset-0 bg-secondary z-50 flex justify-center items-center'>
							<Loader className='animte-spin' />
						</Skeleton>
					)}
					<Avatar className='size-32'>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className='bg-primary text-white text-6xl'>CN</AvatarFallback>
					</Avatar>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button
								size={'icon'}
								className='absolute right-0 bottom-0 rounded-full border border-primary'
								variant={'secondary'}
							>
								<Edit2 />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle />
							</DialogHeader>
								{/* <Uploader 
								onChange={(url, key) => 
								onUpdateAvatar(url, key)} 
								/> */}
								<Uploader
								value={user.avatar}
								onUploaded={(url, key) => {
									onUpdateAvatar(url, key)
								}}
								setUploading={setIsLoading}
								/>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className='my-3 bg-secondary px-4'>
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>{d.fullName}</h2>
								<p className='text-muted-foreground'>{user.name}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<FullNameForm user={user} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>{d.email}</h2>
								<p className='text-muted-foreground'>{user.email?.trim() ? user.email : d.emailNotProvided}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<EmailForm user={user} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	)
}

export default EditInformation