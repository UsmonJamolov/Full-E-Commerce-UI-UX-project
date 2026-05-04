import { redirect } from 'next/navigation'

const HeaderSettingsPage = async () => {
	redirect('/admin/settings')
}

export default HeaderSettingsPage
