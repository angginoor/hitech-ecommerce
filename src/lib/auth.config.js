
export const authConfig = {
    pages: {
        signIn: "/login",
        register: '/register'
    },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id
            }
            return token
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id
            }
            return session
        },
        authorized({auth, request}) {
            const user = auth?.user
            const isOnCheckoutPage = request.nextUrl.pathname.startsWith('/checkout')
            const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login')
            const isOnRegisterPage = request.nextUrl?.pathname.startsWith('/register')

            if (isOnCheckoutPage && !user) {
                return false
            }

            if (isOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }

            if (isOnRegisterPage && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }

            return true
        }
    }
}