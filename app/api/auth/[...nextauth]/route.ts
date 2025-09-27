import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/db";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params) {
            if (!params.user.email) {
                return false;
            }
            try {
                await prisma.user.create({
                    data: {
                        email: params.user.email,
                        provider: 'Google'

                    }
                })
            } catch (e) {
            }
            return true;

        }
    }
})

export { handler as GET, handler as POST }




// import { NextResponse } from "next/server";

// now each route "/api/auth/anyroute" will show the "hi there"
// export function GET(){
//     return NextResponse.json({
//         message:"Hi there"
//     })
// } 
