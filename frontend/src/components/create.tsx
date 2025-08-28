"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";
import SongPanel from "@/components/create/song-panel";

interface CreateSongProps {
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined;
  className?: string;
  children?: ReactNode;
}

export default function CreateSong({
  size,
  variant = "outline",
  className,
  children,
}: CreateSongProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          variant={variant}
          className={cn("text-foreground bg-transparent", className)}
        >
          {children ?? "Generate a Song"}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background/70 flex w-[90vw] flex-col items-center justify-center backdrop-blur-lg md:w-[70vw]">
        <DialogHeader>
          <DialogTitle>Generate a Song</DialogTitle>
        </DialogHeader>
        <SongPanel isDialog={true} />
      </DialogContent>
    </Dialog>
  );
}
