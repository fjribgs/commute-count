"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigationLoader } from "@/components/navigation-loader";
import { LayoutGrid, Route, CalendarRange, ChartColumn } from "lucide-react";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Overview & Simulator",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Routes & Vehicles",
    url: "/vehicles",
    icon: Route,
  },
  {
    title: "Daily Commute Log",
    url: "/logs",
    icon: CalendarRange,
  },
  {
    title: "Statistical Deep-Dive",
    url: "/statistical",
    icon: ChartColumn,
  }
];

export function NavMain() {
  const pathname = usePathname();
  const { startLoading } = useNavigationLoader();

  return (
    <SidebarMenu className="flex flex-col gap-1.5 p-1 font-inter">
      <SidebarGroupLabel className="my-2 pb-0 uppercase font-semibold tracking-wider">
        Workspace
      </SidebarGroupLabel>
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <Link
              href={item.url}
              onClick={() => {
                if (pathname !== item.url) {
                  startLoading();
                }
              }}
              className="flex items-center gap-2"
            >
              <SidebarMenuButton
                isActive={isActive}
                className={`mx-1 h-10.5 cursor-pointer ${
                  isActive
                    ? "relative bg-orange-sm! hover:bg-orange-sm! font-semibold text-orange-xl! hover:text-orange-xl! before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-orange-lg before:content-['']"
                    : "transition hover:bg-orange-sm!"
                } `}
              >
                <item.icon className={`size-6 ${isActive ?? 'text-orange-lg'}`} />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
