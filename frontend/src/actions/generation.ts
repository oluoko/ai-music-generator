"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function queueSong() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const song = await db.song.create({
    data: {
      userId: session.user.id,
      title: "Test Song 1",
      fullDescribedSong:
        "A 90s, east coast, hip hop song about the an aspiring film maker",
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
