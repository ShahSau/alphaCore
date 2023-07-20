"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Code, ImageIcon, LayoutDashboard, MessageSquare, GraduationCap, Bug, Smile, Hash, 
     Music, Settings, VideoIcon, Database, Languages, Play,
} from "lucide-react";

const montserrat = Montserrat ({ weight: '600', subsets: ['latin'] });

// import them from constants
const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      href: '/image',
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
      href: '/video',
    },
    {
        label: 'Language to SQL',
        icon: Database,
        color: "text-green-700",
        href: '/sql',
      },
    {
    label: 'Grammar Correction',
    icon: GraduationCap,
    color: "text-pink-700",
    href: '/grammer',
      },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
      href: '/music',
    },
    {
      label: 'Emoji Chat',
      icon: Smile,
      color: "text-orange-300",
      href: '/emoji',
    },
    {
        label: 'Translation',
        icon: Languages,
        color: "text-purple-700",
        href: '/translation',
      },
      {
        label: 'Explain Code',
        icon: Hash,
        color: "text-pink-700",
        href: '/explain',
      },
      {
        label: 'Summarize Text',
        icon: Play,
        color: "text-orange-700",
        href: '/summarize',
      },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      href: '/code',
    },
    {
        label: 'Python Bug Fixer',
        icon: Bug,
        color: "text-red-700",
        href: '/python',
      },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];
const Sidebar = () => {

    const pathname = usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image src="/copy.png"  alt="logo" fill/>
                    </div>
                    <h1 className={cn("text-lg font-bold", montserrat.className)}>alphaCore</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route, i) => (
                        <Link 
                            href={route.href} 
                            key={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
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
        </div>
    )
}

export default Sidebar;