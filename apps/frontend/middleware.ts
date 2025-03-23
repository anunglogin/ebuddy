import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get('isLogin')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/auth'];

    if (!isLogin && !publicRoutes.includes(pathname)) {
        console.log('Redirect to /auth');
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    if (isLogin == 'true' && pathname === '/auth') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth',
        '/',
    ]
}