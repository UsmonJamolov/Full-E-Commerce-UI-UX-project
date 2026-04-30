const ContactsPage = () => {
	return (
		<div className='mx-auto w-full max-w-6xl px-4 py-10'>
			<h1 className='text-3xl font-bold'>Contacts</h1>
			<p className='mt-3 text-muted-foreground'>Biz bilan bog&apos;lanish uchun quyidagi ma&apos;lumotlardan foydalaning.</p>
			<div className='mt-6 space-y-2 rounded-lg border bg-white p-4'>
				<p>
					<span className='font-semibold'>Phone:</span> +998 90 000 00 00
				</p>
				<p>
					<span className='font-semibold'>Email:</span> support@exclusive.uz
				</p>
				<p>
					<span className='font-semibold'>Address:</span> Tashkent, Uzbekistan
				</p>
			</div>
		</div>
	)
}

export default ContactsPage
