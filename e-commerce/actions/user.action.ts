// 'use server'

// import { axiosClient } from '@/http/axios'
// import { actionClient } from '@/lib/safe-action'
// import { idSchema, searchParamsSchema } from '@/lib/validation'
// import { ReturnActionType } from '@/types'

// export const getProducts = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
// 	const { data } = await axiosClient.get('/api/user/products', {
// 		params: parsedInput,
// 	})
// 	return JSON.parse(JSON.stringify(data))
// })

// export const getProduct = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
// 	const { data } = await axiosClient.get(`/api/user/product/${parsedInput.id}`)
// 	return JSON.parse(JSON.stringify(data))
// })


// 'use server'

// import { axiosClient } from '@/http/axios'
// import { actionClient } from '@/lib/safe-action'
// import { idSchema, searchParamsSchema } from '@/lib/validation'
// // Yangi aniqlangan qaytarish tiplarini import qilamiz
// import { GetProductsActionReturnType, GetProductActionReturnType } from '@/types'

// export const getProducts = actionClient
//   .schema(searchParamsSchema) // next-safe-action 7.9.9 uchun `schema` to'g'ri
//   .action<GetProductsActionReturnType>(async ({ parsedInput }) => {
//     try {
//       const response = await axiosClient.get('/api/user/products', {
//         params: parsedInput,
//       });

//       // Axios javobi `response.data` ichida bo'ladi.
//       // Sizning konsol chiqishingizda `response.data` ichida yana `data` kaliti bor edi.
//       // Masalan, API javobi `{ "data": [ { mahsulot } ] }` shaklida keladi.
//       // Shuning uchun bizga `response.data.data` kerak.
//       const productsData = JSON.parse(JSON.stringify(response.data.data)); // Asl mahsulotlar massivi

//       return {
//         data: productsData,
//         status: response.status,
//         // serverError: undefined, // Agar xato bo'lmasa, undefined qoldiramiz
//         // validationErrors: undefined,
//       };
//     } catch (error: any) {
//       // Xato ishlov berishni `safe-action` ga mos qiling
//       // Masalan, safe-actionning `handleReturnedServerError` funksiyasini ishlatish
//       return {
//         data: [], // Xato bo'lganda bo'sh massiv qaytarish
//         serverError: error.message || 'Failed to fetch products',
//         // Agar z.ZodError kabi validatsiya xatoliklarini qaytarsa, ularni ham qo'shing
//       };
//     }
//   });

// export const getProduct = actionClient
//   .schema(idSchema) // next-safe-action 7.9.9 uchun `schema` to'g'ri
//   .action<GetProductActionReturnType>(async ({ parsedInput }) => {
//     try {
//       const response = await axiosClient.get(`/api/user/product/${parsedInput.id}`);
      
//       const productData = JSON.parse(JSON.stringify(response.data.data)); // Asl mahsulot obyekti

//       return {
//         data: productData,
//         status: response.status,
//       };
//     } catch (error: any) {
//       return {
//         data: {} as IProduct, // Xato bo'lganda bo'sh obyekt (yoki null) qaytarish
//         serverError: error.message || `Failed to fetch product with ID: ${parsedInput.id}`,
//       };
//     }
//   });

'use server';

import { axiosClient } from '@/http/axios';
import { actionClient } from '@/lib/safe-action';
import { idSchema, searchParamsSchema } from '@/lib/validation';
import {
  GetProductsActionReturnType,
  GetProductActionReturnType,
  IProduct,
} from '@/types';

// 🔥 GET PRODUCTS
export const getProducts = actionClient
  .schema(searchParamsSchema)
  .action(async ({ parsedInput }) => {
    try {
      const response = await axiosClient.get('/api/user/products', {
        params: parsedInput,
      });

      console.log("API:", response.data);

      const productsData: IProduct[] =
        response.data?.data ||
        response.data?.products ||
        response.data ||
        [];

      return { data: productsData };

    } catch (error: any) {
      return {
        data: [],
        serverError: "Xatolik yuz berdi",
      };
    }
  });

// 🔥 GET SINGLE PRODUCT
export const getProduct = actionClient
  .schema(idSchema)
  .action<GetProductActionReturnType>(async ({ parsedInput }) => {
    try {
      const response = await axiosClient.get(
        `/api/user/product/${parsedInput.id}`
      );

      const productData: IProduct = response.data.data;

      return {
        data: productData,
      };
    } catch (error: any) {
      console.error('GET PRODUCT ERROR:', error);

      return {
        data: {} as IProduct,
        serverError: 'Mahsulotni olishda xatolik yuz berdi',
      };
    }
  });