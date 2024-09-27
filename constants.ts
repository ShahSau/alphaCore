import { Code, ImageIcon, MessageSquare, Database,
  ClipboardList, GraduationCap, Sigma, Presentation, HelpCircle, Feather, MailPlus, Ratio
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    modelName:"Chat"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
    modelName:"Image"
  },
  {
    label: 'Language to SQL',
    icon: Database,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: '/sql',
    modelName:"SQL"
  },
  {
    label: 'Summerizer',
    icon: ClipboardList,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: '/summerizer',
    modelName:"Summery"
  },
  {
    label: 'Grammar Correction',
    icon: GraduationCap,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/grammer',
    modelName:"Grammar"
      },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
    modelName:"Code"
  },
  {
    label: 'Article Summery',
    icon: Sigma,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: '/article',
    modelName:"Article"
  },

  {
    label: 'Lesson Planner',
    icon: Presentation,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    href: '/lesson',
    modelName:"Lesson"
  },
  {
    label: 'Interview Questions',
    icon: HelpCircle,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: '/interview',
    modelName:"Interview"
  },
  {
    label: 'Logo generator',
    icon: Feather,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: '/logo',
    modelName:"Logo"
  },
  {
    label: 'Email',
    icon: MailPlus,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: '/email',
    modelName:"Email"
  },
  {
    label: 'Portrait Generation',
    icon: Ratio,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/portrait',
    modelName:"Portrait"
  },
  
];