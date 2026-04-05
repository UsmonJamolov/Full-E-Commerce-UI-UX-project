const axios = require('axios');

const API_ID = process.env.SMS_RU_API_ID;

async function sendSMS(phone, message) {
  try {
    const response = await axios.get('https://sms.ru/sms/send', {
      params: {
        api_id: API_ID,
        to: phone,
        msg: message,
        json: 1
      }
    });

    const data = response.data;

    if (data.status === "OK" && data.sms[phone]?.status === "OK") {
      console.log(`✅ SMS yuborildi: ${phone}`);
      return true;
    } else {
      console.error("❌ SMS.ru javobi:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ SMS yuborish xatosi:", error.message);
    return false;
  }
}

module.exports = { sendSMS };