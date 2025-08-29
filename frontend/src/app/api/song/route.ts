import { getPresignedUrl } from "@/actions/generation";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const songs = await db.song.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const songsWithThumbnails = await Promise.all(
      songs.map(async (song) => {
        const thumbnailUrl = song.thumbnailS3Key
          ? await getPresignedUrl(song.thumbnailS3Key)
          : null;

        return {
          id: song.id,
          title: song.title,
          instrumental: song.instrumental,
          prompt: song.prompt,
          lyrics: song.lyrics,
          describedLyrics: song.describedLyrics,
          fullDescribedSong: song.fullDescribedSong,
          thumbnailUrl,
          playUrl: null,
          status: song.status,
          createdByUserName: song.user?.name,
          published: song.published,
        };
      }),
    );

    return NextResponse.json(songsWithThumbnails);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
