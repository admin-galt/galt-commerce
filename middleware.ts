import { type NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/:path*", "/((?!api/revalidate).*)"],
};

export default function middleware(req: NextRequest) {
	// Skip middleware for /api/revalidate route
	if (req.nextUrl.pathname.startsWith("/api/revalidate")) {
		return NextResponse.next();
	}

	const auth = req.headers.get("authorization");

	const username = process.env.BASIC_AUTH_USERNAME;
	const password = process.env.BASIC_AUTH_PASSWORD;

	try {
		// If no auth header, respond with 401 and prompt for credentials
		if (!auth) {
			throw new Error("Authentication required");
		}

		// Decode the base64 encoded credentials
		const [user, pwd] = atob(auth.split(" ")[1] || "").split(":");

		// Check if credentials match
		if (user === username && pwd === password) {
			return NextResponse.next();
		}

		throw new Error("Invalid credentials");
	} catch (e) {
		const err = e as Error;
		return new Response(err.message, {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Area"',
			},
		});
	}
}
