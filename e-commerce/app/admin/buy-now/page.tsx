import { getBuyNowSettingsAdmin } from '@/actions/admin.aciton'
import BuyNowSettingsForm from './settings-form'

const Page = async () => {
	const settingsRes = await getBuyNowSettingsAdmin()
	const targetDate = settingsRes?.data?.targetDate || ''
	const image = settingsRes?.data?.image || ''
	const imageKey = settingsRes?.data?.imageKey || ''
	const isTimerVisible = settingsRes?.data?.isTimerVisible ?? true
	const isTimerPaused = settingsRes?.data?.isTimerPaused ?? false

	return (
		<div className='rounded-lg border bg-white p-4'>
			<h1 className='text-2xl font-bold'>Buy Now timer</h1>
			<p className='mt-1 text-sm text-muted-foreground'>Home sahifadagi countdown vaqtini boshqaring.</p>
			<BuyNowSettingsForm
				initialTargetDate={targetDate}
				initialImage={image}
				initialImageKey={imageKey}
				initialTimerVisible={isTimerVisible}
				initialTimerPaused={isTimerPaused}
			/>
		</div>
	)
}

export default Page
