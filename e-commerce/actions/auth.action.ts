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
        success: Boolean(data?.success && data?.user),
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
    const { confirmPassword: _omit, ...payload } = parsedInput;
    try {
      const { data } = await axiosClient.post("/api/auth/register", payload);
      return JSON.parse(JSON.stringify(data));
    } catch (error: unknown) {
      const d = (error as { response?: { data?: unknown } })?.response?.data;
      if (d && typeof d === "object") {
        return JSON.parse(JSON.stringify(d)) as ReturnActionType;
      }
      return { success: false, message: "Server error" } as unknown as ReturnActionType;
    }
  });

export const sendOtp = actionClient
  .schema(sendOtpSchema)
  .action<ReturnActionType>(async ({ parsedInput }) => {
    try {
      const { data } = await axiosClient.post("/api/otp/send", parsedInput);
      return JSON.parse(JSON.stringify(data));
    } catch (error: unknown) {
      const d = (error as { response?: { data?: unknown } })?.response?.data;
      if (d && typeof d === "object") {
        return JSON.parse(JSON.stringify(d)) as ReturnActionType;
      }
      return { success: false, message: "Server error" } as unknown as ReturnActionType;
    }
  });

export const verifyOtp = actionClient
  .schema(verifyOtpSchema)
  .action<ReturnActionType>(async ({ parsedInput }) => {
    try {
      const { data } = await axiosClient.post("/api/otp/verify", parsedInput);
      return JSON.parse(JSON.stringify(data));
    } catch (error: unknown) {
      const d = (error as { response?: { data?: unknown } })?.response?.data;
      if (d && typeof d === "object") {
        return JSON.parse(JSON.stringify(d)) as ReturnActionType;
      }
      return { success: false, message: "Server error" } as unknown as ReturnActionType;
    }
  });