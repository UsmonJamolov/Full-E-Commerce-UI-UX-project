// "use server";

// import { axiosClient } from "@/http/axios";
// import { actionClient } from "@/lib/safe-action";
// import { loginSchema } from "@/lib/validation";
// import { ReturnActionType } from "@/types";

// export const login = async (values: {
//   phone: string;
//   password: string;
// }) => {
//   try {
//     const { data } = await axiosClient.post("/api/auth/login", values, {
//       withCredentials: true, // cookie ishlashi uchun
//     });

//     return JSON.parse(JSON.stringify(data))
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.response?.data?.message || "Server error",
//     };
//   }
// };

// export const login = actionClient
//   .schema(loginSchema)
//   .action<ReturnActionType>(async ({ parsedInput }) => {
//     try {
//       const { data } = await axiosClient.post("/api/auth/login", parsedInput, {
//         withCredentials: true,
//       });

//       return JSON.parse(JSON.stringify(data));
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error?.response?.data?.message || "Server error",
//       };
//     }
//   });


"use server";

import { axiosClient } from "@/http/axios";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/lib/validation";

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
