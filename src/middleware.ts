import { NextRequest, NextResponse } from "next/server";

let locales = ['en', 'pt']

function getLocale(request: Request) {
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang) {
        const preferred = acceptLang.split(',')[0].split('-')[0];
        if (locales.includes(preferred)) return preferred;
    }
    return 'pt';
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    if (
        pathnameHasLocale ||
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/public') ||
        pathname.startsWith('/images')
    ) {
        return NextResponse.next();
    }

    const locale = getLocale(request)

    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next).*)',
        // '/'
    ],
}