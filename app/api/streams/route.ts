import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "@/app/lib/db"
import youtubesearchapi from "youtube-search-api"



// firstly define a schema on which we are going to work on
const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

// now define the format of youtube/spotify url later check with test
// const YT_REGEX = new RegExp("/^.*(?:youtu\.be\/|youtube\.com\/(?:v\/|embed\/|watch\?v=))([^#&?]*).*/");
const YT_REGEX = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:v\/|embed\/|watch\?v=))([^#&?]*).*/;
const SPOTIFY_REGEX = /^(?:https?:\/\/)?(?:open\.)?spotify\.com\/[^\s]+$/;



export async function POST(req: NextRequest) {

    try {
        const data = CreateStreamSchema.parse(await req.json())

        // feed the url formats & verify
        const isYT = YT_REGEX.test(data.url)
        const isSpotify = SPOTIFY_REGEX.test(data.url)

        // check for the verification
        if (!isYT && !isSpotify) {
            return NextResponse.json({
                message: "Invalid Url"
            }, { status: 411 })
        }

        // the below code is also useful but now no use
        // const extractedId = data.url.split("?v=")[1]


        // extractedId is defined in prisma schema, now we feed it , also we feed the type
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
        const videoDetails = await youtubesearchapi.GetVideoDetails(extractedId)

        const thumbnails = videoDetails.thumbnail.thumbnails
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1);
        // const smallImg = thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1);

        //  if all goes well, create a stream
        const stream = await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type,
                title: videoDetails.title ?? "Can't find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://static.vecteezy.com/system/resources/previews/008/255/803/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://static.vecteezy.com/system/resources/previews/008/255/803/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            }
        })

        return NextResponse.json({
            messsage: "Stream added successfully",
            id: stream.id
        }, {
            status: 201
        })
    } catch (e) {
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

    // it was returning -> streams[], so a bit modification 
    // if (streams.length === 0) {
    //     return NextResponse.json(
    //         { message: "No streams found" },
    //         { status: 404 }
    //     );
    // }
}