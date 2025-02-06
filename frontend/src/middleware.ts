import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    if (!token && !path.startsWith("/admin/sign-in")) {
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }

    if (token && path.startsWith("/admin/sign-in")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/admin", "/admin/sign-in"], 
};
