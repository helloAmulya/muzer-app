import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod"
import { prisma } from "@/app/lib/db"

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

const YT_REGEX = /^.*(?:youtu\.be\/|youtube\.com\/(?:v\/|embed\/|watch\?v=))([^#&?]*).*/;
const SPOTIFY_REGEX = /^(?:https?:\/\/)?(?:open\.)?spotify\.com\/[^\s]+$/;

export async function POST(req: NextRequest) {

    try {
        const data = CreateStreamSchema.parse(await req.json())
        const isYT = YT_REGEX.test(data.url)
        const isSpotify = SPOTIFY_REGEX.test(data.url)

        if (!isYT && !isSpotify) {
            return NextResponse.json({
                message: "Invalid Url"
            }, { status: 411 })
        }
        // const extractedId = data.url.split("?v=")[1]

        let extractedId = data.url;
        let type: "Youtube" | "Spotify" = "Youtube"


        if (isYT) {
            const match = data.url.match(YT_REGEX)
            extractedId = match && match[1] ? match[1] : data.url
            type = "Youtube"
        } else if (isSpotify) {
            const parts = data.url.split("/")
            extractedId = parts[parts.length - 1].split("?")[0]
            type = "Spotify"
        }

        await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type
            }
        })



    } catch (error) {
        return NextResponse.json({
            message: "Error while adding a stream"
        },
            {
                status: 411
            })

    }

}


export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prisma.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({ streams })

}