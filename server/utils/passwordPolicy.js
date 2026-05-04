/**
 * Yangi parol talablari (ro‘yxatdan o‘tish, OTP, parolni yangilash) — frontend zod bilan mos.
 * @param {unknown} password
 * @returns {{ ok: true } | { ok: false, message: string }}
 */
function validateRegistrationPassword(password) {
	if (typeof password !== 'string' || password.length === 0) {
		return { ok: false, message: 'Parol kiriting' }
	}
	if (password.length < 8) {
		return { ok: false, message: 'Parol kamida 8 ta belgi bo‘lsin' }
	}
	if (password.length > 72) {
		return { ok: false, message: 'Parol 72 tadan oshmasin' }
	}
	if (!/[A-Za-zА-Яа-яЁё]/.test(password)) {
		return { ok: false, message: 'Parolda kamida bitta harf bo‘lsin' }
	}
	if (!/\d/.test(password)) {
		return { ok: false, message: 'Parolda kamida bitta raqam bo‘lsin' }
	}
	return { ok: true }
}

module.exports = { validateRegistrationPassword }
