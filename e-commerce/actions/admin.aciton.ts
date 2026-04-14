'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import { productSchema, uploadSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const getProducts = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } })
	return JSON.parse(JSON.stringify(data))
})

type UploadResponse = {
  url: string
  key: string
}

export const uploadFile = actionClient
  .schema(uploadSchema)
  .action<UploadResponse>(async ({ parsedInput }) => {
    try {
      const session = await getServerSession(authOptions)
      const token = await generateToken(session?.currentUser?._id)

      const { data: presigned } = await axiosClient.post(
        "/api/files/upload-url",
        {
          fileName: parsedInput.fileName,
          fileType: parsedInput.fileType,
          fileSize: parsedInput.fileSize,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      await axiosClient.put(presigned.uploadUrl, parsedInput.file, {
        headers: {
          "Content-Type": parsedInput.fileType,
        },
      })

      return {
        url: presigned.fileUrl,
        key: presigned.key,
      }
    } catch (err) {
      return {
        url: "",
        key: "",
      }
    }
  })

export const createProduct = actionClient.schema(productSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/admin/create-product',
		{ ...parsedInput, price: parseFloat(parsedInput.price) },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	console.log("CREATE PRODUCT INPUT:", data)
	
	revalidatePath('/admin/products')
	return JSON.parse(JSON.stringify(data))
})
