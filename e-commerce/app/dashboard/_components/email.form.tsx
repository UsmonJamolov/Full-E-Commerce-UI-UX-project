'use client'

import { updateUser } from '@/actions/user.action'
import { useI18n } from '@/components/providers/i18n-provider'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const emailFormSchema = z.object({
	email: z.union([z.literal(''), z.string().min(1).email('Email noto‘g‘ri')]),
})

type FormValues = z.infer<typeof emailFormSchema>

interface Props {
	user: IUser
}

const EmailForm: FC<Props> = ({ user }) => {
	const { dictionary } = useI18n()
	const d = dictionary.dashboard
	const { update } = useSession()
	const { isLoading, onError, setIsLoading } = useAction()

	const form = useForm<FormValues>({
		resolver: zodResolver(emailFormSchema),
		defaultValues: { email: user.email ?? '' },
	})

	async function onSubmit(values: FormValues) {
		setIsLoading(true)
		const res = await updateUser({ email: values.email ?? '' })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError(d.genericError)
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast(d.emailUpdated)
			await update()
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<Label className='text-xs'>{d.email}</Label>
							<FormControl>
								<Input
									type='email'
									autoComplete='email'
									placeholder={d.emailPlaceholder}
									className='bg-white'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-xs text-red-500' />
						</FormItem>
					)}
				/>
				<Button type='submit' className='self-end mb-0.5' size={'sm'} disabled={isLoading}>
					{d.submit} {isLoading && <Loader className='animate-spin' />}
				</Button>
			</form>
		</Form>
	)
}

export default EmailForm
