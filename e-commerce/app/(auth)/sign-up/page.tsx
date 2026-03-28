// 'use client';

// import { useState } from 'react';

// export default function SignUp() {
//   const [phone, setPhone] = useState('+7');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSendOTP = async () => {
//     if (!phone || phone.length < 10) {
//       setError("Telefon raqamni to'liq kiriting");
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phone }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage("SMS kod muvaffaqiyatli yuborildi!");
//         // Keyingi bosqichga o'tish (masalan, OTP kiritish sahifasiga)
//         // setStep('otp'); // agar ikki bosqichli qilmoqchi bo'lsangiz
//       } else {
//         setError(data.message || "Xatolik yuz berdi");
//       }
//     } catch (err) {
//       setError("Server bilan bog'lanishda xatolik. Internetni tekshiring.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Telefon raqam orqali kirish</h2>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Telefon raqamingiz
//           </label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="+7 (___) ___-__-__"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
//           />
//         </div>

//         <button
//           onClick={handleSendOTP}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           {loading ? "Yuborilmoqda..." : "SMS kod yuborish"}
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
//         )}

//         {error && (
//           <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
//         )}

//         <p className="text-xs text-gray-500 text-center mt-6">
//           Rossiya raqami (+7 bilan boshlanishi kerak)
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';

export default function SignUp() {
  const [phone, setPhone] = useState('+7');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 🔹 OTP yuborish
  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError("Telefon raqamni to'liq kiriting");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("SMS kod yuborildi (console’dan oling)");
        setStep(2); // 👉 OTP input chiqadi
      } else {
        setError(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("Server bilan bog'lanishda xatolik");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP tekshirish

  const handleVerifyOTP = async () => {
  if (!otp) {
    setError("OTP kodni kiriting");
    return;
  }

  setLoading(true);
  setError('');
  setMessage('');

  try {
    const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Xatolik yuz berdi");
      return;
    }

    if (data.success) {
      localStorage.setItem("token", data.token); // 🔥 ENG MUHIM
      setMessage("Login muvaffaqiyatli ✅");

      // redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      setError(data.message || "OTP noto‘g‘ri");
    }

  } catch (err) {
    setError("Server bilan bog'lanishda xatolik");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Telefon raqam orqali kirish
        </h2>

        {/* 🔹 STEP 1: PHONE */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon raqamingiz
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg"
            >
              {loading ? "Yuborilmoqda..." : "SMS kod yuborish"}
            </button>
          </>
        )}

        {/* 🔹 STEP 2: OTP */}
        {step === 2 && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP kod
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-lg"
            >
              {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
            </button>
          </>
        )}

        {/* 🔹 MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          Rossiya raqami (+7 bilan boshlanishi kerak)
        </p>
      </div>
    </div>
  );
}