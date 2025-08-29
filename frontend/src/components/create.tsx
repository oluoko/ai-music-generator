"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, type ElementRef, type ReactNode } from "react";
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
  const closeCreateSongRef = useRef<ElementRef<"button">>(null);
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
        <DialogClose ref={closeCreateSongRef}></DialogClose>
        <DialogHeader>
          <DialogTitle>Generate a Song</DialogTitle>
        </DialogHeader>
        <SongPanel isDialog={true} closeCreateSongRef={closeCreateSongRef} />
      </DialogContent>
    </Dialog>
  );
}
