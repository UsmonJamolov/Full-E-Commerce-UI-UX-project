import {
	getBuyNowSettingsAdmin,
	getFooterSettingsAdmin,
	getHeaderSettingsAdmin,
	getHomeSliderSettingsAdmin,
} from '@/actions/admin.aciton'
import FooterSettingsForm from '../_components/footer-settings-form'
import HomeSliderSettingsForm from '../_components/home-slider-settings-form'
import HeaderSettingsForm from '../_components/header-settings-form'
import { getPublicHomeSliderSlides } from '@/lib/home-slider-public'

import BuyNowSettingsForm from './settings-form'

const Page = async () => {
	const [settingsRes, headerSettings, footerSettings, homeSliderRes] = await Promise.all([
		getBuyNowSettingsAdmin(),
		getHeaderSettingsAdmin(),
		getFooterSettingsAdmin(),
		getHomeSliderSettingsAdmin(),
	])
	const homeSliderSlides =
		homeSliderRes?.data?.slides?.length === 4
			? homeSliderRes.data.slides
			: await getPublicHomeSliderSlides('ru')
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
			<HomeSliderSettingsForm initialSlides={homeSliderSlides} />
			<FooterSettingsForm
				initialPhonePrimary={footerSettings?.data?.phonePrimary || '+79210975576'}
				initialPhoneSecondary={footerSettings?.data?.phoneSecondary || '+79650015442'}
				initialSupportHours={footerSettings?.data?.supportHours || '10:00 – 22:00'}
				initialEmail={footerSettings?.data?.email || 'exclusive@gmail.com'}
				initialTelegramUrl={footerSettings?.data?.telegramUrl || 'https://t.me/'}
				initialMaxMessengerUrl={footerSettings?.data?.maxMessengerUrl || 'https://max.ru/'}
				initialBrandBlurb={
					footerSettings?.data?.brandBlurb ||
					'Quality fashion and footwear. Thousands of happy customers shop with us every day.'
				}
			/>
		</div>
	)
}

export default Page
