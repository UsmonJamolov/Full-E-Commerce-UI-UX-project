"use server";

import { axiosClient } from "@/http/axios";
import { actionClient } from "@/lib/safe-action";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
  sendOtpSchema,
} from "@/lib/validation";
import { ReturnActionType } from "@/types";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { data } = await axiosClient.post("/api/auth/login", parsedInput, {
        withCredentials: true,
      });

      return {
        success: data?.success ?? true,
        message: data?.message ?? "Login successful",
        user: data?.user,
        accessToken: data?.accessToken,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Server error",
      };
    }
  });

export const register = actionClient
  .schema(registerSchema)
  .action<ReturnActionType>(async ({ parsedInput }) => {
    const { data } = await axiosClient.post("/api/auth/register", parsedInput);
    return JSON.parse(JSON.stringify(data));
  });

export const sendOtp = actionClient
  .schema(sendOtpSchema)
  .action<ReturnActionType>(async ({ parsedInput }) => {
    const { data } = await axiosClient.post("/api/otp/send", parsedInput);
    return JSON.parse(JSON.stringify(data));
  });

export const verifyOtp = actionClient
  .schema(verifyOtpSchema)
  .action<ReturnActionType>(async ({ parsedInput }) => {
    const { data } = await axiosClient.post("/api/otp/verify", parsedInput);
    return JSON.parse(JSON.stringify(data));
  });