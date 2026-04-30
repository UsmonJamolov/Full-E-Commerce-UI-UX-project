import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

const getClientIp = (req: NextRequest): string => {
	const forwarded = req.headers.get("x-forwarded-for");
	return forwarded?.split(",")[0]?.trim() || "unknown";
};

export async function proxy(req: NextRequest) {
	const ip = getClientIp(req);

	if (!rateLimiter(ip)) {
		return NextResponse.json(
			{ message: "Too many requests, please try again later." },
			{ status: 429 },
		);
	}

	const { pathname } = req.nextUrl;
	const isProtectedPath =
		pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

	// Server Action POST + redirect = brauzerda "Failed to fetch" (fetchServerAction).
	// Himoya server action ichida (getServerSession / token) qilinadi.
	const isNextServerAction =
		req.method === "POST" &&
		(req.headers.has("next-action") || req.headers.has("Next-Action"));

	if (isProtectedPath && !isNextServerAction) {
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});
		if (!token) {
			const signIn = new URL("/sign-in", req.url);
			signIn.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(signIn);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
