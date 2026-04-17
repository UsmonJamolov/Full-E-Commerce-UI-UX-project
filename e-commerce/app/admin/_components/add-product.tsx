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
import { categories } from '@/lib/constants'
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

const AddProduct = () => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { open, setOpen, product, setProduct } = useProduct()
	const [uploading, setUploading] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	console.log("SELECTED FILE:", selectedFile)

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: { title: '', description: '', category: '', price: '', image: '', imageKey: '', },
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

		console.log("Uploaded:", uploaded)

		if (!uploaded?.data?.url) {
			return toast("Image upload failed")
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
		if (res?.serverError || res?.validationErrors || !res?.data) {
		return onError("Something went wrong")
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
		// setProduct({_id: '', title: '', description: '', category: '', price: 0, image: '', imageKey: '',})
		setProduct({ _id: '', title: '', description: '', category: '', price: 0, image: '', imageKey: '', reviews: 0, cta: false })
	}

	useEffect(() => {
		if (product) {
			form.reset({...product, price: product.price.toString()})
		}
	}, [product])
	
	return (
		<>
			<Button size={'sm'} onClick={onOpen}>
				<span>Add Product</span>
				<PlusCircle />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
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
										<Label className='text-xs'>Title</Label>
										<FormControl>
											<Input placeholder='Adidas shoes' className='bg-secondary' disabled={isLoading} {...field} />
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
										<Label className='text-xs'>Description</Label>
										<FormControl>
											<Textarea placeholder='Adidas shoes are the best shoes in the world' disabled={isLoading} className='bg-secondary' {...field} />
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
										<Label className='text-xs'>Cateogry</Label>
										<Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
											<FormControl>
												<SelectTrigger className='bg-secondary'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.slice(1).map(category => (
													<SelectItem value={category} key={category}>
														{category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
							{!selectedFile && (	
								<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Uploader
										value={field.value}
										onChange={(file) => {
											setSelectedFile(file);
											// form.setValue("image", "selected", { shouldValidate: true });											
										}}
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
							
							{uploading && <p>Uploading image...</p>}
							<Button type='submit' disabled={isLoading} className='w-full'>
								Submit {isLoading && <Loader2 className='animate-spin' />}
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct