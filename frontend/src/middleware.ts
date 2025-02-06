import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    if (!token && path.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (token && path === "/dashboard/admin") {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/admin"], 
};