import { Meta } from "@/components/meta";
import SongPanel from "@/components/create/song-panel";
import { Suspense } from "react";
import TrackListFetcher from "@/components/create/track-list-fetcher";
import { Loader2 } from "lucide-react";
import LoadingDots from "@/components/loading-dots";

export const generateMetadata = () => {
  return Meta({
    title: "Create",
    description: "Generate a new song on an AI Music Generator site",
  });
};

export default function CreatePage() {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SongPanel />
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Loader2 className="mr-2 size-8 animate-spin" />
            <LoadingDots text="Loading" />
          </div>
        }
      >
        <TrackListFetcher />
      </Suspense>
    </div>
  );
}
