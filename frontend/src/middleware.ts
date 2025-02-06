import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Если пользователь не авторизован и пытается получить доступ к защищенным страницам
    if (!token && path.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    // Если пользователь авторизован и пытается получить доступ к странице входа
    if (token && path === "/dashboard/admin") {
        return NextResponse.next(); // Разрешить доступ к странице администратора
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/admin"], 
};