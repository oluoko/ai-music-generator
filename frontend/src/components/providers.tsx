"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { ThemeProvider } from "@/components/theme-provider";

const ToasterWithInverseTheme = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toasterTheme = useMemo(() => {
    if (!mounted) return undefined;
    return resolvedTheme === "dark" ? "light" : "dark";
  }, [mounted, resolvedTheme]);

  return <Toaster theme={toasterTheme} position="bottom-center" />;
};

const TopLoaderWithTheme = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loaderColor = useMemo(() => {
    if (!mounted) return "#3c00a3";
    return resolvedTheme === "dark" ? "#4b00cc" : "#3c00a3";
  }, [mounted, resolvedTheme]);

  return <NextTopLoader color={loaderColor} showSpinner={false} />;
};

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  const navigate = useCallback((path: string) => router.push(path), [router]);
  const replace = useCallback((path: string) => router.replace(path), [router]);
  const onSessionChange = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={navigate}
        replace={replace}
        onSessionChange={onSessionChange}
        Link={Link}
      >
        <TopLoaderWithTheme />
        {children}
        <ToasterWithInverseTheme />
      </AuthUIProvider>
    </ThemeProvider>
  );
}
