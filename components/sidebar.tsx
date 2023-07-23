"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Code, ImageIcon, LayoutDashboard, MessageSquare, GraduationCap, Bug, Smile, Hash, Crop,
    Sun, Headphones,UserCog,
     Music, Settings, VideoIcon, Database, Languages, Play, Presentation, HelpCircle, MailPlus, UserSquare2, PersonStanding, Feather, ImageMinus, FileSignature, CopyMinus
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
        color: "text-red-700",
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
      label: 'Lesson Planner',
      icon: Presentation,
      color: "text-sky-700",
      href: '/lesson',
    },
      {
        label: 'Interview Questions',
        icon: HelpCircle,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Image Restoring',
        icon: Crop,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Summarize',
        icon: Sun,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Whisper',
        icon: Headphones,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Makeup',
        icon: UserCog,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Email',
        icon: MailPlus,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Profile pic',
        icon: UserSquare2,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Game Charactor',
        icon: PersonStanding,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Logo generator',
        icon: Feather,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Background remover',
        icon: ImageMinus,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Object removal',
        icon: CopyMinus,
        color: "text-sky-700",
        href: '/lesson',
      },
      {
        label: 'Color image',
        icon: FileSignature,
        color: "text-sky-700",
        href: '/lesson',
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
        <div className="space-y-4 py-4 flex flex-col overflow-scroll bg-[#111827] text-white">
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