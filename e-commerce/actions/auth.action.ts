"use server";

export async function getCurrentUser() {
  try {
    const res = await fetch("http://localhost:8080/api/auth/me", {
      credentials: "include", // 🔥 COOKIE OLISH UCHUN
      cache: "no-store",
    });

    const data = await res.json();

    console.log("User actionda kelishi kerak", data);
    

    return data.user;
  } catch (error) {
    return null;
  }
}