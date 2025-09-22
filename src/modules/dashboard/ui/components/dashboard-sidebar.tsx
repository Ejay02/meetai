"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link className="flex gap-4 items-center px-2 pt-2" href="/">
           <Image src="/logo.svg" alt="Meet.AI logo" height={32} width={32} />{" "}
          <p className="text-sm font-semibold">Meet.AI</p>{" "}
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem className="" key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-gradient-to-r border border-transparent hover:border-[#c4b5a0]/10 from-sidebar-accent/80 via-sidebar-accent/40 to-transparent",
                      pathname === item.href &&
                        "bg-gradient-to-r  from-sidebar-accent/60 via-sidebar-accent/30 to-sidebar-accent/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem className="" key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-gradient-to-r border border-transparent hover:border-[#c4b5a0]/10 from-sidebar-accent/80 via-sidebar-accent/40 to-transparent",
                      pathname === item.href &&
                        "bg-gradient-to-r  from-sidebar-accent/60 via-sidebar-accent/30 to-sidebar-accent/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/*  */}
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
