import { getNewArrivalSettingsAdmin, type NewArrivalCard } from '@/actions/admin.aciton'
import NewArrivalForm from './new-arrival-form'

const FALLBACK: NewArrivalCard[] = [
	{
		title: 'PlayStation 5',
		desc: 'Black and White version of the PS5 coming out on sale.',
		image: '/images/ps5.png',
		imageKey: '',
	},
	{
		title: "Women's Collections",
		desc: 'Featured woman collections that give you another vibe.',
		image: '/images/woman-collection.png',
		imageKey: '',
	},
	{
		title: 'Speakers',
		desc: 'Amazon wireless speakers',
		image: '/images/amazon-echo.png',
		imageKey: '',
	},
	{
		title: 'Perfume',
		desc: 'GUCCI INTENSE OUD EDP',
		image: '/images/gucci-perfume.png',
		imageKey: '',
	},
]

const Page = async () => {
	const res = await getNewArrivalSettingsAdmin()
	const cards = res?.data?.cards?.length === 4 ? res.data.cards : FALLBACK

	return (
		<div className='rounded-lg border bg-white p-4'>
			<h1 className='text-2xl font-bold'>Новые поступления</h1>
			<p className='mt-1 text-sm text-muted-foreground'>
				Управляйте изображением, заголовком и описанием для 4 карточек блока New Arrival на главной странице.
			</p>
			<NewArrivalForm initialCards={cards} />
		</div>
	)
}

export default Page
