import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "@/components/user-dropdown";
import Logo from "@/components/logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomeNav() {
  const { data: session } = authClient.useSession();

  return (
    <nav className="border-border/40 bg-background/90 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b p-6">
      <Logo />
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Dashboard
            </Link>
            <UserDropdown />
          </>
        ) : (
          <>
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ size: "sm" })}
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Get Started
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
