import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    console.log("request 1");
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
    console.log(response, request);

    try {
        console.log("entrou 1");
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        // If the cookie is updated, update the cookies for the request and response
                        request.cookies.set({
                            name,
                            value,
                            ...options,
                        });
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        });
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        });
                    },
                    remove(name, options) {
                        // If the cookie is removed, update the cookies for the request and response
                        request.cookies.delete({
                            name,
                            ...options,
                        });
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        });
                        response.cookies.delete({
                            name,
                            ...options,
                        });
                    },
                },
            }
        );
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/';
            return NextResponse.redirect(redirectUrl);
        }
        console.log("entrou 2");
   
        if (session && request.nextUrl.pathname === '/') {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/dashboard';
            return NextResponse.redirect(redirectUrl);
        }
        console.log("entrou 3");
        return response;
    } catch (e) {
        console.log("entrou 4");
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico).*)'],
};


// export const config = {
//     matcher: '/*',
// };