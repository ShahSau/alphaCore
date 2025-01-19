"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  ClipboardList,
  Settings,
  Database,
  Sigma,
  Presentation,
  HelpCircle,
  MailPlus,
  Feather,
  Ratio,
} from "lucide-react";
import { FreeCounter } from "./free-counter";
import { tools } from "@/constants";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className=" min-h-screen flex flex-col overflow-scroll no-scrollbar bg-[#111827] text-white">
      <div className="px-3 py-1 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className={cn("text-lg font-bold", montserrat.className)}>
            alphaCore
          </h1>
        </Link>
        <div className="pb-16">
          {tools.map((route, i) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
