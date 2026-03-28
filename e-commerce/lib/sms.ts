// lib/sms.ts
import axios from 'axios';

const SMS_RU_API_ID = process.env.SMS_RU_API_ID; // .env faylga qo‘shing

export async function sendOTP(phone: string, otp: string): Promise<boolean> {
  try {
    const message = `Sizning tasdiqlash kodingiz: ${otp}. Kod 10 daqiqa ichida amal qiladi.`;

    const response = await axios.get('https://sms.ru/sms/send', {
      params: {
        api_id: SMS_RU_API_ID,
        to: phone,                    // +7XXXXXXXXXX formatida
        msg: message,
        json: 1,                      // JSON javob olish uchun
      },
    });

    const data = response.data;

    if (data.status === "OK" && data.sms[phone].status === "OK") {
      console.log(`SMS yuborildi: ${phone}, ID: ${data.sms[phone].sms_id}`);
      return true;
    } else {
      console.error("SMS.ru xatosi:", data);
      return false;
    }
  } catch (error) {
    console.error("SMS yuborishda xatolik:", error);
    return false;
  }
}