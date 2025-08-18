"use client";

import { queueSong } from "@/actions/generation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
    <Button
      size={size}
      variant={variant}
      className={cn("text-foreground bg-transparent", className)}
      onClick={queueSong}
    >
      {children ?? "Generate a Song"}
    </Button>
  );
}
