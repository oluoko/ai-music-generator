import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import TrackList from "@/components/create/track-list";
import { redirect } from "next/navigation";
import { getSongs } from "@/actions/song";

export default async function TrackListFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const songsWithThumbnails = await getSongs(session.user.id);

  return <TrackList tracks={songsWithThumbnails} />;
}
