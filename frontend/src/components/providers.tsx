"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";

function ToasterWithInverseTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Toaster position="bottom-center" />;
  }

  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "light" : "dark"}
      position="bottom-center"
    />
  );
}

function TopLoaderWithTheme() {
  const { resolvedTheme } = useTheme();
  const resolvedLoaderColor = resolvedTheme === "dark" ? "#4b00cc" : "#3c00a3";

  return <NextTopLoader color={resolvedLoaderColor} showSpinner={false} />;
}

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={(path) => router.push(path)}
        replace={(path) => router.replace(path)}
        onSessionChange={() => {
          // Clear router cache (protected routes)
          router.refresh();
        }}
        Link={Link}
      >
        <TopLoaderWithTheme />
        {children}
        <ToasterWithInverseTheme />
      </AuthUIProvider>
    </ThemeProvider>
  );
}
