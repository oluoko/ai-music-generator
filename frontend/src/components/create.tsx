"use client";

import { generateSong } from "@/actions/generation";
import { Button } from "@/components/ui/button";
import { cn, placeholders } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";
import LoadingDots from "./loading-dots";

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
  const [loading, startGenerating] = useTransition();
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const currentPlaceholder = placeholders[currentPlaceholderIndex];

  const handleGenerateSong = async () => {
    const requestBody = {
      fullDescribedSong: currentPlaceholder,
      instrumental: false,
    };
    toast.success(
      `This "${currentPlaceholder}" will be used to generate a song.`,
    );

    startGenerating(async () => {
      try {
        await generateSong(requestBody);
      } catch (error) {
        console.error("Error generating song:", error);
        toast.error("Failed to generate song");
      }
    });
  };
  return (
    <Button
      size={size}
      variant={variant}
      className={cn("text-foreground bg-transparent", className)}
      onClick={handleGenerateSong}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          <LoadingDots text="Generating" className="text-muted-foreground" />
        </>
      ) : (
        (children ?? "Generate a Song")
      )}
    </Button>
  );
}
