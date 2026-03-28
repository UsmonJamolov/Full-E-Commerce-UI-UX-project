'use server';

import { axiosClient } from '@/http/axios';
import { actionClient } from '@/lib/safe-action';
import { idSchema, searchParamsSchema } from '@/lib/validation';
import {
  GetProductsActionReturnType,
  GetProductActionReturnType,
  IProduct,
} from '@/types';
import { cookies } from 'next/headers';

// 🔥 GET PRODUCTS
export const getProducts = actionClient
  .schema(searchParamsSchema)
  .action(async ({ parsedInput }) => {
    try {
      // ✅ TO‘G‘RI
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await axiosClient.get('/api/user/products', {
        params: parsedInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      // ✅ TOKENNI COOKIE DAN OLAMIZ
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await axiosClient.get(
        `/api/user/product/${parsedInput.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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