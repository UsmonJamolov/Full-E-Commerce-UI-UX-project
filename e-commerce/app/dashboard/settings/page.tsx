'use client'

import { useI18n } from '@/components/providers/i18n-provider'
import { updatePassword, updateUser } from '@/actions/user.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { passwordSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const Page = () => {
	const { dictionary } = useI18n()
	const d = dictionary.dashboard
	const {isLoading, onError, setIsLoading} = useAction()
	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { confirmPassword: '', newPassword: '', oldPassword: '' },
	})

	async function onDelete() {
		setIsLoading(true)
		const res = await updateUser({isDeleted: true, deletedAt: new Date()})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError(d.genericError)
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast(d.settingsAccountDeleted)
			setIsLoading(false)
			signOut({callbackUrl: '/sign-up'})
		}
	}
	
	async function onSubmit(values: z.infer<typeof passwordSchema>) {
		setIsLoading(true)
		const res = await updatePassword(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError(d.genericError)
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast(d.settingsPasswordUpdated)
			setIsLoading(false)
			form.reset()
		}
	}

	return (
		<>
			<h1 className='text-xl font-bold'>{d.settingsDangerZone}</h1>
			<Separator className='my-3' />
			<div className='p-4 bg-secondary flex flex-col space-y-0'>
				<div className='text-lg font-bold'>{d.settingsDeleteAccount}</div>
				<p className='text-sm text-muted-foreground'>{d.settingsDeleteDesc}</p>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className='w-fit' size={'sm'} variant={'destructive'}>
							{d.settingsDeleteButton}
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{d.settingsAlertTitle}</AlertDialogTitle>
							<AlertDialogDescription>{d.settingsAlertDescription}</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>{d.settingsCancel}</AlertDialogCancel>
							<AlertDialogAction onClick={onDelete} disabled={isLoading}>
								{d.settingsContinue}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div className='p-4 bg-secondary mt-4'>
				<div className='w-1/2'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='oldPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>{d.oldPassword}</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>{d.newPassword}</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>{d.confirmPassword}</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button type='submit'>{d.submit}</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Page