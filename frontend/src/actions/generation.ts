"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "@/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface GenerateRequest {
  prompt?: string;
  lyrics?: string;
  fullDescribedSong?: string;
  describedLyrics?: string;
  instrumental?: boolean;
  audioDuration?: number;
}

export async function generateSong(generateRequest: GenerateRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  await queueSong(generateRequest, 7.5, session.user.id);
  await queueSong(generateRequest, 15, session.user.id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/create");
}

export async function queueSong(
  generateRequest: GenerateRequest,
  guidanceScale: number,
  userId: string,
) {
  let title = "Untitled";
  if (generateRequest.describedLyrics) title = generateRequest.describedLyrics;
  if (generateRequest.fullDescribedSong)
    title = generateRequest.fullDescribedSong;

  title = title.charAt(0).toUpperCase() + title.slice(1);

  const song = await db.song.create({
    data: {
      userId,
      title,
      prompt: generateRequest.prompt,
      lyrics: generateRequest.lyrics,
      instrumental: generateRequest.instrumental,
      describedLyrics: generateRequest.describedLyrics,
      fullDescribedSong: generateRequest.fullDescribedSong,
      guidanceScale,
      audioDuration: generateRequest.audioDuration ?? 180,
    },
  });

  await inngest.send({
    name: "generate.song-event",
    data: {
      songId: song.id,
      userId: song.userId,
    },
  });
}

export async function getPlayUrl(songId: string) {
  //  const session = await auth.api.getSession({
  //    headers: await headers(),
  //  });

  //  if (!session) redirect("/auth/sign-in");

  const song = await db.song.findUnique({
    where: {
      id: songId,
      published: true,
      s3Key: {
        not: null,
      },
    },
    select: {
      s3Key: true,
    },
  });

  if (!song) redirect("/");

  await db.song.update({
    where: { id: songId },
    data: {
      listenCount: {
        increment: 1,
      },
    },
  });

  return getPresignedUrl(song.s3Key!);
}

export async function getPresignedUrl(key: string) {
  const s3client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3client, command, {
    expiresIn: 3600,
  });
}
