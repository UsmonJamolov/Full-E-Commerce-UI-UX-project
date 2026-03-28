// auth.ts yoki app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sendOTP } from "@/lib/sms";

// OTP larni vaqtinchalik saqlash uchun (ishlab chiqarishda Redis tavsiya etiladi)
const otpStore = new Map(); // { phone: { otp: string, expires: Date } }

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    Credentials({
      id: "phone-otp",
      name: "Telefon raqam",
      credentials: {
        phone: { label: "Telefon", type: "tel" },
        otp: { label: "SMS kod", type: "text" },
        action: { type: "hidden" }, // "send" yoki "verify"
      },
      async authorize(credentials) {
        if (!credentials?.phone) return null;

        const phone = String(credentials.phone).replace(/\D/g, "");
        if (!phone.startsWith("7") && !phone.startsWith("8")) {
          throw new Error("Faqat Rossiya raqamlari (+7) qabul qilinadi");
        }

        const fullPhone = phone.startsWith("8") ? "7" + phone.slice(1) : phone;

        // 1. Kod yuborish bosqichi
        if (credentials.action === "send") {
          const otp = Math.floor(100000 + Math.random() * 900000).toString();

          const success = await sendOTP("+" + fullPhone, otp);

          if (!success) {
            throw new Error("SMS yuborib bo‘lmadi. Keyinroq urinib ko‘ring.");
          }

          // OTP ni 10 daqiqa saqlaymiz
          otpStore.set(fullPhone, {
            otp,
            expires: Date.now() + 10 * 60 * 1000,
          });

          throw new Error("OTP_SENT"); // Frontendda ushbu xatoni tutamiz
        }

        // 2. Kodni tekshirish bosqichi
        if (credentials.otp) {
          const stored = otpStore.get(fullPhone);

          if (!stored || Date.now() > stored.expires) {
            throw new Error("Kod muddati tugagan yoki topilmadi");
          }

          if (stored.otp === String(credentials.otp)) {
            otpStore.delete(fullPhone); // ishlatilgan kodni o‘chirish

            // Foydalanuvchini topish yoki yaratish
            // let user = await prisma.user.findUnique({ where: { phone: "+" + fullPhone } });
            // if (!user) user = await prisma.user.create({ data: { phone: "+" + fullPhone } });

            return {
              id: "user-id", // bazangizdagi ID
              phone: "+" + fullPhone,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
});