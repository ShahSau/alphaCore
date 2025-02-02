"use client";
import React from "react";
import PageLayout from '@/components/common/pageLayout'
import PageComponent from "@/components/common/page-component";
import { ClipboardType, Book, SpellCheck, MailPlus, Presentation, Sigma, MessageCircle } from "lucide-react";

const tools = [
  {
    label: "Summerizer",
    icon: ClipboardType,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/summerizer",
    modelName: "Summerizer",
  },
  {
    label: "Grammer correction",
    icon: SpellCheck,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/grammer-correction",
    modelName: "Grammer correction",
  },
  {
    label: "Article summery",
    icon: Sigma,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/article",
    modelName: "Article summery",
  },
  {
    label: "Lesson Planner",
    icon: Presentation,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/lesson-planner",
    modelName: "Lesson Planner",
  },
  {
    label: "Email Generation",
    icon: MailPlus,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/email",
    modelName: "Email Generation",
  },
  {
    label: "Form Generation",
    icon: Book,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/form-generation",
    modelName: "Form Generation",
  },
  {
    label: "Text to Speach",
    icon: MessageCircle,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/productivity/text-to-speach",
    modelName: "Text to Speach",

  },
];
const Page = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Productivity"
        desc="Explore a variety of tools for increasing your productivity."
        tools={tools}
      />

    </PageLayout>
  )
}

export default Page