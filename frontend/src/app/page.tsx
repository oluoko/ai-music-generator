import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Sparkles,
  Zap,
  Play,
  Brain,
  ArrowRight,
  Guitar,
} from "lucide-react";
import Link from "next/link";
import HomeNav from "@/components/home-nav";
import CreateSong from "@/components/create";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { getPresignedUrl } from "@/actions/generation";
import TrackList from "@/components/create/track-list";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <HomeNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-32">
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by ACE-Step AI
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Create Music with
            <span className="from-primary to-chart-2 bg-gradient-to-r bg-clip-text text-transparent">
              {" "}
              AI
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl">
            Transform your ideas into original music. Generate songs from text
            descriptions, custom lyrics, or style prompts using state-of-the-art
            AI technology.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {session ? (
              <>
                <CreateSong size="lg" className="px-8 py-6 text-xl">
                  Start Creating Music
                  <ArrowRight className="ml-2 h-5 w-5" />
                </CreateSong>
                <Link
                  href="/dashboard/create"
                  className={buttonVariants({
                    size: "lg",
                    className: "px-8 py-6 text-xl",
                  })}
                >
                  Create Song Page
                </Link>
              </>
            ) : (
              <Link
                href="/auth/sign-up"
                className={buttonVariants({
                  size: "lg",
                  className: "px-8 py-6 text-xl",
                })}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}{" "}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-xl"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Listen to Examples
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background/70 flex w-[90vw] flex-col items-center justify-center backdrop-blur-lg md:w-[70vw]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Listen to Examples
                  </DialogTitle>
                </DialogHeader>
                {songsWithThumbnails.length > 0 ? (
                  <TrackList tracks={songsWithThumbnails} isExamples />
                ) : (
                  <p>No examples available</p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything you need</h2>
            <p className="text-muted-foreground text-xl">
              Simple tools to create amazing music
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Brain className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Smart Generation</h3>
              <p className="text-muted-foreground">
                AI-powered music creation from simple text descriptions or
                custom lyrics
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Guitar className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Multiple Styles</h3>
              <p className="text-muted-foreground">
                Create vocal tracks with lyrics or pure instrumental music in
                any style
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Zap className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Fast Processing</h3>
              <p className="text-muted-foreground">
                Lightning-fast generation powered by serverless GPU
                infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Music className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">High Quality</h3>
              <p className="text-muted-foreground">
                Professional-grade audio output with AI-generated thumbnails
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-16 text-3xl font-bold">How it works</h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold">Describe</h3>
              <p className="text-muted-foreground">
                Write what kind of music you want to create
              </p>
            </div>

            <div>
              <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold">Generate</h3>
              <p className="text-muted-foreground">
                AI creates your original music in seconds
              </p>
            </div>

            <div>
              <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold">Download</h3>
              <p className="text-muted-foreground">
                Get your music and share it with the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Ready to create your first song?
          </h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Start making music with AI in seconds
          </p>

          {session ? (
            <CreateSong size="lg" className="px-8 py-6 text-xl">
              Start Creating Music
              <ArrowRight className="ml-2 h-5 w-5" />
            </CreateSong>
          ) : (
            <Link
              href="/auth/sign-up"
              className={buttonVariants({
                size: "lg",
                className: "px-8 py-6 text-xl",
              })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 border-t px-4 py-8">
        <div className="text-muted-foreground mx-auto max-w-4xl text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} AI Music Generator. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
