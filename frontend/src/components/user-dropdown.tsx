"use client";

import {
  LogOutIcon,
  Home,
  LayoutDashboardIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { defaultProfileImage, getInitals, getNameFromEmail } from "@/lib/utils";
import { useSignOut } from "@/hooks/use-signout";

export function UserDropdown() {
  const { data: session } = authClient.useSession();
  const handleLogout = useSignOut();

  if (!session) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto rounded-full p-0 hover:bg-transparent"
        >
          <Avatar>
            <AvatarImage
              src={
                session.user.image ??
                defaultProfileImage({ email: session.user.email })
              }
              alt="Profile image"
            />
            <AvatarFallback>
              {getInitals(
                session.user.name ||
                  getInitals(getNameFromEmail(session.user.email)),
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {session.user.name || getNameFromEmail(session.user.email)}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {session.user.email || "anonymous@user.null"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home className="size-4 opacity-60" aria-hidden="true" />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboardIcon
                className="size-4 opacity-60"
                aria-hidden="true"
              />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon className="size-4 opacity-60" aria-hidden="true" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <SettingsIcon className="size-4 opacity-60" aria-hidden="true" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="w-full">
          <LogOutIcon className="size-4 opacity-60" aria-hidden="true" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
