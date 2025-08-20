"use client";

import { IconLogout, IconSettings, IconUserCircle } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { usePathname } from "next/navigation";

const navSecondaryItems = [
  {
    title: "Account",
    url: "/account/settings",
    icon: IconUserCircle,
  },
  {
    title: "Security",
    url: "/account/security",
    icon: IconSettings,
  },
  {
    title: "Exit Dashboard",
    url: "/",
    icon: IconLogout,
  },
];

export function NavSecondary({
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navSecondaryItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`${isActive(item.url) && "bg-primary text-primary-foreground"}`}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
