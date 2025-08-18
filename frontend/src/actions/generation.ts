"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
