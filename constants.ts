import {
  Code,
  ImageIcon,
  MessageSquare,
  ClipboardList,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

export const MAX_FREE_COUNTS = 10;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    modelName: "Chat",
  },
  {
    label: "Image & Video",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video",
    modelName: "Image & Video",
  },
  {
    label: "Productivity",
    icon: ClipboardList,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity",
    modelName: "Productivity",
  },
  {
    label: "Creativity",
    icon: GraduationCap,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/creativity",
    modelName: "Creativity",
  },
  {
    label: "Programming",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming",
    modelName: "Programming",
  },
  {
    label: "Job search",
    icon: HelpCircle,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/job-search",
    modelName: "Job search",
  },
];
