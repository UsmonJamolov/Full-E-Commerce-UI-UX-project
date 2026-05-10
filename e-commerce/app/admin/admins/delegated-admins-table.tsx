'use client'

import { deleteDelegatedAdmin, type DelegatedAdminRow } from '@/actions/admin.aciton'
import { useI18n } from '@/components/providers/i18n-provider'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DelegatedAdminsTable({ admins }: { admins: DelegatedAdminRow[] }) {
	const { dictionary } = useI18n()
	const a = dictionary.admin
	const router = useRouter()
	const [deletingId, setDeletingId] = useState<string | null>(null)

	function contactLabel(row: DelegatedAdminRow) {
		if (row.email) return row.email
		if (row.phone) return row.phone
		return '—'
	}

	async function onDelete(id: string) {
		setDeletingId(id)
		try {
			const res = await deleteDelegatedAdmin({ id })
			if (res?.serverError || res?.validationErrors || !res?.data) {
				toast.error('Ошибка')
				return
			}
			const data = res.data as { success?: boolean; message?: string }
			if (data.success === false) {
				toast.error(data.message || 'Ошибка')
				return
			}
			toast.success(a.delegatedAdminRemoved)
			router.refresh()
		} catch {
			toast.error('Ошибка')
		} finally {
			setDeletingId(null)
		}
	}

	if (admins.length === 0) {
		return <p className='text-sm text-muted-foreground'>{a.delegatedAdminsEmpty}</p>
	}

	return (
		<div className='rounded-lg border bg-white'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>{a.delegatedAdminsColName}</TableHead>
						<TableHead>{a.delegatedAdminsColContact}</TableHead>
						<TableHead className='hidden sm:table-cell'>{a.delegatedAdminsColCreated}</TableHead>
						<TableHead className='w-[120px] text-right'>{''}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{admins.map(row => (
						<TableRow key={row._id}>
							<TableCell className='font-medium'>{row.name}</TableCell>
							<TableCell className='max-w-[200px] truncate text-sm text-muted-foreground'>{contactLabel(row)}</TableCell>
							<TableCell className='hidden text-sm text-muted-foreground sm:table-cell'>
								{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}
							</TableCell>
							<TableCell className='text-right'>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button type='button' variant='outline' size='sm' disabled={deletingId === row._id}>
											{a.delegatedAdminsDeleteBtn}
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>{a.delegatedAdminsDeleteTitle}</AlertDialogTitle>
											<AlertDialogDescription>{a.delegatedAdminsDeleteDesc}</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel type='button'>{a.cancel}</AlertDialogCancel>
											<AlertDialogAction type='button' onClick={() => void onDelete(row._id)}>
												{a.delete}
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
