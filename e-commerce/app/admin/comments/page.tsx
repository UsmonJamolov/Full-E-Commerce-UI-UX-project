import { getAdminReviews } from '@/actions/admin.aciton'
import CommentsManager from '../_components/comments-manager'

const AdminCommentsPage = async () => {
	const res = await getAdminReviews()
	const reviews = res?.data?.reviews || []

	return (
		<div className='space-y-4 rounded-lg border bg-white p-4'>
			<div>
				<h1 className='text-2xl font-bold'>Kommentariyalar</h1>
				<p className='text-sm text-muted-foreground'>Bu yerda admin commentlarni ko‘radi, o‘zgartiradi va javob beradi.</p>
			</div>
			<CommentsManager reviews={reviews} />
		</div>
	)
}

export default AdminCommentsPage
