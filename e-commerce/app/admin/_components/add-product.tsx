'use client'

import { createProduct, updateProduct, uploadFile} from "@/actions/admin.aciton";
import {Uploader} from "@/components/Uploader";
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useAction } from "@/hooks/use-action";
import { useProduct } from '@/hooks/use-product'
import AdminCategoryField from './admin-category-field'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusCircle, X } from 'lucide-react'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { toast } from "sonner";
import { z } from 'zod'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function firstValidationMessage(validationErrors: unknown): string | null {
	if (!validationErrors || typeof validationErrors !== 'object') return null
	const fe = (validationErrors as { fieldErrors?: Record<string, string[] | undefined> }).fieldErrors
	if (fe) {
		for (const v of Object.values(fe)) {
			if (v?.[0]) return v[0]
		}
	}
	return null
}

const AddProduct = () => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { open, setOpen, product, setProduct } = useProduct()
	const [uploading, setUploading] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	console.log("SELECTED FILE:", selectedFile)

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: { title: '', description: '', category: '', targetGroup: 'Erkak', price: '', image: '', imageKey: '', isNew: true },
	})

	console.log('Form getValues: ', form.getValues());
	
	
	async function onSubmit(values: z.infer<typeof productSchema>) {
	console.log("SEND DATA:", values)

	setIsLoading(true)

	try {
		let imageUrl = values.image
		let imageKey = values.imageKey

		// 🔥 AGAR yangi file tanlangan bo‘lsa → upload qilamiz
		if (selectedFile) {
		const uploaded = await uploadFile({
			file: selectedFile,
			fileName: selectedFile.name,
			fileType: selectedFile.type,
			fileSize: selectedFile.size,
		})

		if (uploaded?.serverError) {
			toast.error(typeof uploaded.serverError === 'string' ? uploaded.serverError : 'Image upload failed')
			return
		}

		if (!uploaded?.data?.url) {
			toast.error('Image upload failed')
			return
		}

		imageUrl = uploaded.data.url
		imageKey = uploaded.data.key
		}

		// 🔥 AGAR create bo‘lsa → image majburiy
		if (!product && !imageUrl) {
		return toast("Please upload an image")
		}

		let res

		if (product?._id) {
		// ✅ UPDATE
		res = await updateProduct({
			...values,
			image: imageUrl,
			imageKey: imageKey,
			id: product._id,
		})
		} else {
		// ✅ CREATE
		res = await createProduct({
			...values,
			image: imageUrl,
			imageKey: imageKey,
		})
		}

		// ❌ ERROR handling
		if (res?.validationErrors) {
			const msg = firstValidationMessage(res.validationErrors)
			return onError(msg || 'Validation failed')
		}
		if (res?.serverError || !res?.data) {
			const se = res?.serverError
			return onError(typeof se === 'string' && se ? se : 'Something went wrong')
		}

		if (res.data.failure) {
		return onError(res.data.failure)
		}

		// ✅ SUCCESS
		if (res.data.status === 201) {
		toast.success("Product created successfully")
		}

		if (res.data.status === 200) {
		toast("Product updated successfully")
		}

		setOpen(false)
		form.reset()

	} catch (err) {
		console.error(err)
		toast("Something went wrong")
	} finally {
		setIsLoading(false)
	}
	}

	function onOpen() {
		setOpen(true)
		setProduct({ _id: '', title: '', description: '', category: '', targetGroup: 'Erkak', price: 0, image: '', imageKey: '', reviews: [], reviewCount: 0, ratingAverage: 0, isNew: true, cta: false })
	}

	useEffect(() => {
		if (product) {
			form.reset({...product, price: product.price.toString()})
		}
	}, [product, form])
	
	return (
		<>
			<Button size={'sm'} onClick={onOpen}>
				<span>Add Product</span>
				<PlusCircle />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent className='flex w-full max-w-full flex-col overflow-y-auto sm:max-w-md'>
					<VisuallyHidden>
					<SheetHeader>
						<SheetTitle>Manage your product</SheetTitle>
						<SheetDescription>Field marked with * are required fields and must be filled.</SheetDescription>
					</SheetHeader>
					</VisuallyHidden>
					<Separator className='my-3' />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Название</Label>
										<FormControl>
											<Input placeholder='Например: Adidas shoes' className='bg-secondary' disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Описание</Label>
										<FormControl>
											<Textarea placeholder='Краткое описание товара' disabled={isLoading} className='bg-secondary' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Категория</Label>
										<FormControl>
											<AdminCategoryField
												value={field.value}
												onChange={field.onChange}
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='targetGroup'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Группа (Мужчины/Женщины/Дети)</Label>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
												<SelectTrigger className='bg-secondary'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='Erkak'>Erkak</SelectItem>
													<SelectItem value='Ayol'>Ayol</SelectItem>
													<SelectItem value='Bola'>Bola</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>
											{!form.watch('price') ? 'Price' : `Price ${formatPrice(Number(form.watch('price')))} `}
										</Label>
										<FormControl>
											<Input placeholder='100.000 UZS' type='number' className='bg-secondary' disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isNew'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs flex items-center gap-2'>
											<input
												type='checkbox'
												checked={!!field.value}
												onChange={e => field.onChange(e.target.checked)}
												disabled={isLoading}
											/>
											Показывать бейдж New
										</Label>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							{!selectedFile && (	
								<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Uploader
										value={field.value}
										// onChange={(file: File) => {
										// 	setSelectedFile(file);
										// 	// form.setValue("image", "selected", { shouldValidate: true });											
										// }}
										onChange={(file) => setSelectedFile(file)}
										setUploading={setUploading}
										/>
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
								/>
							)}
							{selectedFile && (
							<div className='w-full h-[200px] relative'>
								<Image
								src={URL.createObjectURL(selectedFile)}
								alt="preview"
								fill
								className="object-cover"
								/>

								<Button
								type="button"
								onClick={() => setSelectedFile(null)}
								className="absolute top-0 right-0"
								>
								X
								</Button>
							</div>
							)}
							
							{uploading && <p>Загрузка изображения...</p>}
							<Button type='submit' disabled={isLoading} className='w-full'>
								Сохранить {isLoading && <Loader2 className='animate-spin' />}
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct