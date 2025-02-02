"use client";
import PageComponent from '@/components/common/page-component';
import PageLayout from '@/components/common/pageLayout'
import { Database, Braces, Binary, Bug, FileCode2 } from 'lucide-react';
import React from 'react'

const tools = [
  {
    label: "Language to SQL",
    icon: Database,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming/sql",
    modelName: "Language to SQL",
  },
  {
    label: "Code Generation",
    icon: Braces,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming/code-generation",
    modelName: "Code Generation",
  },
  {
    label: "Code Summery",
    icon: Binary,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming/code-summery",
    modelName: "Code Summery",
  },
  {
    label: "Code Correction",
    icon: Bug,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming/code-correction",
    modelName: "Code Correction",
  },
  {
    label: "Code convertion",
    icon: FileCode2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/programming/code-convertion",
    modelName: "Code convertion",
  }
];
const Page = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Programming"
        desc="Use our programming tools to generate code, convert code, correct code, generate code summery and convert language to SQL."
        tools={tools}
      />
    </PageLayout>
  )
}

export default Page