import { getPresignedUrl } from "@/actions/generation";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import TrackList from "@/components/create/track-list";
import { redirect } from "next/navigation";

export default async function TrackListFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  // Fetch the user's songs from the database
  const songs = await db.song.findMany({
    where: { userId: session.user.id },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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

  return <TrackList tracks={songsWithThumbnails} />;
}
