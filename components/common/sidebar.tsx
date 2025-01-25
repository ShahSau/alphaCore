"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";
import { tools } from "@/constants";
import { useSidebarToggle } from "@/hooks/use-pro-modal";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const Sidebar = ({ apiLimitCount = 0, isPro = false }) => {
  const pathname = usePathname();
  const toggleSidebar = useSidebarToggle();
  const open = useSidebarToggle((state) => state.isOpen);

  const onClose = () => {
    toggleSidebar.onClose();
  };

  const onOpen = () => {
    toggleSidebar.onOpen();
  };

  return (
    <motion.div
      className={`hidden min-h-screen md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900 ${
        open ? "md:w-72" : "md:w-16"
      }`}
      initial={{ width: 288 }}
      animate={{ width: open ? 288 : 64 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.0 }}
    >
      <div className=" min-h-screen flex flex-col overflow-scroll no-scrollbar bg-[#111827] text-white">
        <div className="px-3 py-1 flex-1">
          <div className="flex items-end justify-between mt-4">
            {open && (
              <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <h1 className={cn("text-lg font-bold", montserrat.className)}>
                  alphaCore
                </h1>
              </Link>
            )}
            <div className="mb-14 flex items-center rounded-lg p-1 hover:bg-white/10">
              {open ? (
                <button onClick={onClose} className="text-white p-1">
                  <ChevronsLeft className="h-5 w-5" />
                </button>
              ) : (
                <button onClick={onOpen} className="text-white p-1">
                  <ChevronsRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          <div className="pb-16">
            {tools.map((route, i) => (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "mt-2 text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
                data-tooltip-id={`tooltip-${route.href}`}
                data-tooltip-content={route.label}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {open && route.label}
                </div>
              </Link>
            ))}
            {!open &&
              tools.map((route) => (
                <Tooltip
                  id={`tooltip-${route.href}`}
                  place="bottom"
                  key={route.href}
                />
              ))}
          </div>
        </div>
        {open && <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />}
      </div>
    </motion.div>
  );
};

export default Sidebar;
