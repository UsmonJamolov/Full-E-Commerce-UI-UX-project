const axios = require('axios');

const API_ID = process.env.SMS_RU_API_ID;
/** SMS.ru kabinetida kelishilgan jo‘natuvchi; bo‘sh bo‘lsa `from` yuborilmaydi (default kabinet sozlamasi). */
const FROM = process.env.SMS_RU_FROM?.trim();

/** SMS.ru `sms` kalitlari odatda `+`siz: `79650015442`. */
function digitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '');
}

async function sendSMS(phone, message) {
  if (!API_ID) {
    console.warn('SMS_RU_API_ID sozlanmagan');
    return false;
  }

  try {
    const params = {
      api_id: API_ID,
      to: phone,
      msg: message,
      json: 1,
    };
    if (FROM) {
      params.from = FROM;
    }

    const response = await axios.get('https://sms.ru/sms/send', {
      params,
      timeout: 20000,
    });

    const data = response.data;
    const want = digitsOnly(phone);

    const logEntryReject = (key, entry) => {
      console.error(
        '[SMS.ru] yuborilmadi:',
        phone,
        '| kalit:',
        key,
        '| status_code:',
        entry?.status_code,
        '| status_text:',
        entry?.status_text || entry?.status
      );
    };

    const entryOk = (entry) =>
      entry &&
      (entry.status === 'OK' ||
        entry.status_code === 100 ||
        Number(entry.status_code) === 100);

    if (data.status !== 'OK' && data.status !== 100) {
      console.error(
        '[SMS.ru] umumiy xato:',
        'status_code:',
        data.status_code,
        '| status_text:',
        data.status_text,
        '| raw:',
        JSON.stringify(data)
      );
    }

    if (data.status === 'OK' && data.sms && typeof data.sms === 'object') {
      for (const [key, entry] of Object.entries(data.sms)) {
        if (digitsOnly(key) !== want) continue;
        if (entryOk(entry)) {
          console.log(`SMS yuborildi: ${phone}`);
          return true;
        }
        logEntryReject(key, entry);
        return false;
      }

      const keys = Object.keys(data.sms);
      if (keys.length === 1) {
        const entry = data.sms[keys[0]];
        if (entryOk(entry)) {
          console.log(`SMS yuborildi (bir qabul qiluvchi): ${phone}`);
          return true;
        }
        logEntryReject(keys[0], entry);
        return false;
      }
    }

    console.error('[SMS.ru] javob:', JSON.stringify(data));
    return false;
  } catch (error) {
    console.error('SMS yuborish xatosi:', error.message);
    return false;
  }
}

module.exports = { sendSMS };