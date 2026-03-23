import { z } from 'zod'

export const idSchema = z.object({ id: z.string() })

export const searchParamsSchema = z.object({
	searchQuery: z.string().optional(),
	filter: z.string().optional(),
	category: z.string().optional(),
	page: z.string().default('1'),
	pageSize: z.string().default('6'),
})