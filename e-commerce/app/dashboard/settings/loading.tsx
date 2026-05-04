import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'

const Loading = async () => {
	const cookieStore = await cookies()
	const d = getDictionary(parseLocale(cookieStore.get('locale')?.value)).dashboard

	return (
		<>
			<h1 className='text-xl font-bold'>{d.settingsDangerZone}</h1>

			<Separator className='my-3' />

			<div className='p-4 bg-secondary flex flex-col space-y-0'>
				<div className='text-lg font-bold'>{d.settingsDeleteAccount}</div>
				<p className='text-sm text-muted-foreground'>{d.settingsDeleteDesc}</p>
				<Button className='w-fit' size={'sm'} variant={'destructive'}>
					{d.settingsDeleteButton}
				</Button>
			</div>
		</>
	)
}

export default Loading
