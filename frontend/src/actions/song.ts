"use server";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPresignedUrl } from "@/actions/generation";

export type Song = {
  id: string;
  title: string;
  instrumental: boolean;
  prompt: string | null;
  lyrics: string | null;
  describedLyrics: string | null;
  fullDescribedSong: string | null;
  thumbnailUrl: string | null;
  playUrl: null;
  status: string;
  createdByUserName: string;
  published: boolean;
};

export async function setPusblishedStatus(songId: string, published: boolean) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  await db.song.update({
    where: {
      id: songId,
      userId: session.user.id,
    },
    data: {
      published,
    },
  });

  revalidatePath("/dashboard/create");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function renameSong(songId: string, newTitle: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  await db.song.update({
    where: {
      id: songId,
      userId: session.user.id,
    },
    data: {
      title: newTitle,
    },
  });

  revalidatePath("/dashboard/create");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function toggleLikeSong(songId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const existingLike = await db.like.findUnique({
    where: {
      userId_songId: {
        userId: session.user.id,
        songId: songId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        userId_songId: {
          userId: session.user.id,
          songId: songId,
        },
      },
    });
  } else {
    await db.like.create({
      data: {
        userId: session.user.id,
        songId: songId,
      },
    });
  }

  revalidatePath("/dashboard/create");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function getSongs(userId?: string) {
  let songs;

  if (userId) {
    songs = await db.song.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    songs = await db.song.findMany({
      where: { 
        published: true 
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  songs = await Promise.all(
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

  return songs;
}
