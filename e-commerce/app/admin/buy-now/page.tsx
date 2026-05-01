import { getBuyNowSettingsAdmin, getFooterSettingsAdmin, getHeaderSettingsAdmin } from '@/actions/admin.aciton'
import FooterSettingsForm from '../_components/footer-settings-form'
import HeaderSettingsForm from '../_components/header-settings-form'
import BuyNowSettingsForm from './settings-form'

const Page = async () => {
	const [settingsRes, headerSettings, footerSettings] = await Promise.all([
		getBuyNowSettingsAdmin(),
		getHeaderSettingsAdmin(),
		getFooterSettingsAdmin(),
	])
	const targetDate = settingsRes?.data?.targetDate || ''
	const image = settingsRes?.data?.image || ''
	const imageKey = settingsRes?.data?.imageKey || ''
	const isTimerVisible = settingsRes?.data?.isTimerVisible ?? true
	const isTimerPaused = settingsRes?.data?.isTimerPaused ?? false
	const locationLabel = (headerSettings?.data?.locationLabel || 'Tashkent').trim()

	return (
		<div className='space-y-4'>
			<div className='rounded-lg border bg-white p-4'>
				<h1 className='text-2xl font-bold'>Настройки сайта</h1>
				<p className='mt-1 text-sm text-muted-foreground'>
					Управляйте таймером Buy now, локацией в хедере и данными в footer на одной странице.
				</p>
			</div>
			<div className='rounded-lg border bg-white p-4'>
				<h2 className='text-lg font-semibold'>Таймер Buy now</h2>
				<BuyNowSettingsForm
					initialTargetDate={targetDate}
					initialImage={image}
					initialImageKey={imageKey}
					initialTimerVisible={isTimerVisible}
					initialTimerPaused={isTimerPaused}
				/>
			</div>
			<HeaderSettingsForm initialLocationLabel={locationLabel} />
			<FooterSettingsForm
				initialPhonePrimary={footerSettings?.data?.phonePrimary || '+79210975576'}
				initialPhoneSecondary={footerSettings?.data?.phoneSecondary || '+79650015442'}
				initialSupportHours={footerSettings?.data?.supportHours || '10:00 – 22:00'}
				initialEmail={footerSettings?.data?.email || 'exclusive@gmail.com'}
				initialTelegramUrl={footerSettings?.data?.telegramUrl || 'https://t.me/'}
				initialMaxMessengerUrl={footerSettings?.data?.maxMessengerUrl || 'https://max.ru/'}
				initialBrandBlurb={
					footerSettings?.data?.brandBlurb ||
					'Exclusive — quality fashion & footwear. Join thousands of happy customers shopping with us every day.'
				}
			/>
		</div>
	)
}

export default Page
