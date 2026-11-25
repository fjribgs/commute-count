"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/app-layout/nav-main";
import { NavUser } from "@/components/app-layout/nav-user";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-200 bg-white! font-inter"
    >
      <SidebarHeader className="flex items-center">
        {collapsed ? (
          <Image
            src="/oil.png"
            alt="CommuteCount Logo"
            width={36}
            height={36}
          />
        ) : (
          <div className="flex gap-2 items-center py-4">
            <Image
              src="/oil.png"
              alt="CommuteCount Logo"
              width={40}
              height={40}
              className="mb-2"
            />
            <h1 className="font-inter font-bold text-lg">CommuteCount</h1>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
