'use client'

import {
	createAdminCategory,
	deleteAdminCategory,
	getAdminCategories,
	updateAdminCategory,
} from '@/actions/admin.aciton'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Pencil, Plus, Trash2, X } from 'lucide-react'
import { FC, useCallback, useState } from 'react'
import { toast } from 'sonner'

export type AdminCategoryRow = {
	_id: string
	name: string
	nameUz?: string
	nameRu?: string
	nameEn?: string
	isDefault?: boolean
}
const FALLBACK_CATEGORIES: AdminCategoryRow[] = [
	{ _id: 'default-shoes', name: 'Shoes', isDefault: true },
	{ _id: 'default-tshirts', name: 'T-Shirts', isDefault: true },
	{ _id: 'default-clothes', name: 'Clothes', isDefault: true },
	{ _id: 'default-umbrellas', name: 'Umbrellas', isDefault: true },
	{ _id: 'default-bags', name: 'Bags', isDefault: true },
	{ _id: 'default-backpacks', name: 'Backpacks', isDefault: true },
	{ _id: 'default-books', name: 'Books', isDefault: true },
	{ _id: 'default-accessories', name: 'Accessories', isDefault: true },
	{ _id: 'default-universal', name: 'Universal', isDefault: true },
]

interface Props {
	value: string
	onChange: (name: string) => void
	disabled?: boolean
}

const AdminCategoryField: FC<Props> = ({ value, onChange, disabled }) => {
	const [open, setOpen] = useState(false)
	const [list, setList] = useState<AdminCategoryRow[]>([])
	const [loading, setLoading] = useState(false)
	const [newNameUz, setNewNameUz] = useState('')
	const [newNameRu, setNewNameRu] = useState('')
	const [newNameEn, setNewNameEn] = useState('')
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editNameUz, setEditNameUz] = useState('')
	const [editNameRu, setEditNameRu] = useState('')
	const [editNameEn, setEditNameEn] = useState('')
	const [deleteTarget, setDeleteTarget] = useState<AdminCategoryRow | null>(null)

	const load = useCallback(async () => {
		setLoading(true)
		try {
			const res = await getAdminCategories()
			if (res?.serverError) {
				toast.error(res.serverError)
				return
			}
			const categories = (res?.data as { categories?: AdminCategoryRow[] } | undefined)?.categories
			if (categories?.length) {
				setList(categories)
			} else {
				setList(FALLBACK_CATEGORIES)
			}
		} finally {
			setLoading(false)
		}
	}, [])

	const onOpenChange = (next: boolean) => {
		setOpen(next)
		if (next) void load()
		if (!next) {
			setEditingId(null)
			setEditNameUz('')
			setEditNameRu('')
			setEditNameEn('')
			setNewNameUz('')
			setNewNameRu('')
			setNewNameEn('')
		}
	}

	const pick = (name: string) => {
		onChange(name)
		setOpen(false)
	}

	const handleCreate = async () => {
		const nameUz = newNameUz.trim()
		const nameRu = newNameRu.trim()
		const nameEn = newNameEn.trim()
		if (!nameUz || !nameRu || !nameEn) return toast.error('Kategoriya nomini 3 tilda kiriting')
		const res = await createAdminCategory({ nameUz, nameRu, nameEn })
		if (res?.serverError || res?.validationErrors) {
			toast.error("Qo'shib bo'lmadi")
			return
		}
		const data = res?.data as { failure?: string; status?: number } | undefined
		if (data?.failure) {
			toast.error(data.failure)
			return
		}
		toast.success("Kategoriya qo'shildi")
		setNewNameUz('')
		setNewNameRu('')
		setNewNameEn('')
		await load()
	}

	const startEdit = (cat: AdminCategoryRow) => {
		setEditingId(cat._id)
		setEditNameUz(cat.nameUz || cat.name)
		setEditNameRu(cat.nameRu || cat.name)
		setEditNameEn(cat.nameEn || cat.name)
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditNameUz('')
		setEditNameRu('')
		setEditNameEn('')
	}

	const saveEdit = async () => {
		if (!editingId) return
		const nameUz = editNameUz.trim()
		const nameRu = editNameRu.trim()
		const nameEn = editNameEn.trim()
		if (!nameUz || !nameRu || !nameEn) return toast.error('Nomlarni 3 tilda kiriting')
		const res = await updateAdminCategory({ id: editingId, nameUz, nameRu, nameEn })
		if (res?.serverError || res?.validationErrors) {
			toast.error('Saqlanmadi')
			return
		}
		const data = res?.data as { failure?: string } | undefined
		if (data?.failure) {
			toast.error(data.failure)
			return
		}
		const prev = list.find((c) => c._id === editingId)?.name
		if (prev && value === prev) onChange(nameEn)
		toast.success('Yangilandi')
		cancelEdit()
		await load()
	}

	const confirmDelete = async () => {
		if (!deleteTarget) return
		const res = await deleteAdminCategory({ id: deleteTarget._id })
		if (res?.serverError || res?.validationErrors) {
			toast.error("O'chirilmadi")
			return
		}
		const data = res?.data as { failure?: string } | undefined
		if (data?.failure) {
			toast.error(data.failure)
			setDeleteTarget(null)
			return
		}
		if (value === deleteTarget.name) onChange('Universal')
		toast.success("Kategoriya o'chirildi")
		setDeleteTarget(null)
		await load()
	}

	return (
		<>
			<Button
				type="button"
				variant="outline"
				disabled={disabled}
				className={cn('h-10 w-full justify-between bg-secondary font-normal')}
				onClick={() => onOpenChange(true)}
			>
				<span className="truncate">{value || 'Kategoriyani tanlang'}</span>
				<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>

			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Kategoriya</DialogTitle>
						<DialogDescription>
							Tanlang, tahrirlang yoki o‘chiring. Yangi kategoriya &quot;Universal&quot;dan keyin
							qo‘shiladi.
						</DialogDescription>
					</DialogHeader>

					{loading ? (
						<p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
					) : (
						<ul className="space-y-1 border rounded-md p-1">
							{list.map((cat) => (
								<li
									key={cat._id}
									className={cn(
										'flex items-center gap-1 rounded-sm px-1 py-0.5',
										value === cat.name && 'bg-primary/10',
									)}
								>
									{editingId === cat._id ? (
										<>
											<Input
												value={editNameUz}
												onChange={(e) => setEditNameUz(e.target.value)}
												className="h-8 flex-1 text-sm"
												placeholder="Nom (UZ)"
												autoFocus
											/>
											<Input
												value={editNameRu}
												onChange={(e) => setEditNameRu(e.target.value)}
												className="h-8 flex-1 text-sm"
												placeholder="Nom (RU)"
											/>
											<Input
												value={editNameEn}
												onChange={(e) => setEditNameEn(e.target.value)}
												className="h-8 flex-1 text-sm"
												placeholder="Nom (EN)"
											/>
											<Button
												type="button"
												size="icon"
												variant="ghost"
												className="h-8 w-8 shrink-0"
												onClick={() => void saveEdit()}
											>
												<Check className="h-4 w-4" />
											</Button>
											<Button
												type="button"
												size="icon"
												variant="ghost"
												className="h-8 w-8 shrink-0"
												onClick={cancelEdit}
											>
												<X className="h-4 w-4" />
											</Button>
										</>
									) : (
										<>
											<button
												type="button"
												className="min-w-0 flex-1 truncate rounded px-2 py-1.5 text-left text-sm hover:bg-accent"
												onClick={() => pick(cat.name)}
											>
												{cat.name}
											</button>
											<Button
												type="button"
												size="icon"
												variant="ghost"
												className="h-8 w-8 shrink-0"
												title="Tahrirlash"
												onClick={() => startEdit(cat)}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											{!cat.isDefault && (
												<Button
													type="button"
													size="icon"
													variant="ghost"
													className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
													title="O‘chirish"
													onClick={() => setDeleteTarget(cat)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											)}
										</>
									)}
								</li>
							))}
						</ul>
					)}

					<div className="space-y-2 border-t pt-3">
						<p className="text-xs font-medium text-muted-foreground">Yangi kategoriya</p>
						<div className="grid grid-cols-1 gap-2">
							<Input
								placeholder="Masalan: Oyoq kiyim (UZ)"
								value={newNameUz}
								onChange={(e) => setNewNameUz(e.target.value)}
								className="bg-secondary"
							/>
							<Input
								placeholder="Например: Обувь (RU)"
								value={newNameRu}
								onChange={(e) => setNewNameRu(e.target.value)}
								className="bg-secondary"
							/>
							<div className="flex gap-2">
								<Input
									placeholder="Example: Shoes (EN)"
									value={newNameEn}
									onChange={(e) => setNewNameEn(e.target.value)}
									className="bg-secondary"
								/>
							<Button type="button" onClick={() => void handleCreate()} disabled={loading}>
								<Plus className="h-4 w-4" />
							</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Kategoriyani o‘chirish?</AlertDialogTitle>
						<AlertDialogDescription>
							&quot;{deleteTarget?.name}&quot; o‘chirilsa, shu kategoriyadagi mahsulotlar &quot;Universal&quot;ga
							o‘tkaziladi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Bekor qilish</AlertDialogCancel>
						<AlertDialogAction onClick={() => void confirmDelete()}>O‘chirish</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default AdminCategoryField
