"use client";

import { type Icon } from "@tabler/icons-react";
import { IconDashboard, IconMusic } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CreateSong from "../create";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Create",
    url: "/dashboard/create",
    icon: IconMusic,
  },
];

export function NavMain() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <CreateSong className="flex w-full justify-start gap-2 text-lg">
              <PlusCircleIcon className="size-5" />
              Create Song
            </CreateSong>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {navMainItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`${isActive(item.url) && "bg-primary text-primary-foreground"}`}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
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
