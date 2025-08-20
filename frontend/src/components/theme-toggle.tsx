"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton className="bg-accent/70 border-foreground/40 relative inline-flex h-6 w-12 items-center rounded-full border">
        <Skeleton className="absolute left-1 size-4 rounded-full border" />
      </Skeleton>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="bg-muted hover:bg-muted/80 border-foreground/40 relative h-6 w-12 rounded-full border p-1"
    >
      <div
        className={`absolute flex size-4 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
          isDark ? "left-1 bg-slate-600" : "left-7 bg-orange-500"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-white" />
        )}
      </div>
    </Button>
  );
}
