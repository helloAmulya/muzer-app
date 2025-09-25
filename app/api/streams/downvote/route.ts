import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const DownVoteSchema = z.object({
    streamId: z.string()
})
export async function POST(req: NextRequest) {

    const session = await getServerSession();

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })
    if (!user) {
        return NextResponse.json({
            message: "Unauthorized"
        },
            { status: 403 })
    }

    try {
        const data = DownVoteSchema.parse(await req.json())
        await prisma.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
    } catch (e) {
        return NextResponse.json({
            message: "Error while upvoting"
        },
            { status: 403 })

    }

}