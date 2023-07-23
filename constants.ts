import { Code, ImageIcon, MessageSquare, Music, Database, VideoIcon,
  ClipboardList, GraduationCap, Play, Presentation, HelpCircle, Feather, MailPlus, Ratio
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Language to SQL',
    icon: Database,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: '/sql',
  },
  {
    label: 'Summerizer',
    icon: ClipboardList,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: '/summerizer',
  },
  {
    label: 'Grammar Correction',
    icon: GraduationCap,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/grammer',
      },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
  {
    label: 'Summarize Text',
    icon: Play,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: '/summarize',
  },

  {
    label: 'Lesson Planner',
    icon: Presentation,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    href: '/lesson',
  },
  {
    label: 'Interview Questions',
    icon: HelpCircle,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: '/interview',
  },
  {
    label: 'Logo generator',
    icon: Feather,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: '/logo',
  },
  {
    label: 'Email',
    icon: MailPlus,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: '/email',
  },
  {
    label: 'Portrait Generation',
    icon: Ratio,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/portrait',
  },
  
];