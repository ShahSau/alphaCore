"use client";
import React from "react";
import PageComponent from "@/components/common/page-component";
import PageLayout from "@/components/common/pageLayout";
import { MessageCircleIcon, FileImage, MessagesSquare } from "lucide-react";
const tools = [
  {
    label: "Resume Builder",
    icon: FileImage,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/job-search/resume-builder",
    modelName: "Job Search",
  },
  {
    label: "Interview Question",
    icon: MessageCircleIcon,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/job-search/interview-question",
    modelName: "Interview Question",
  },
  {
    label: "Mock Interview",
    icon: MessagesSquare,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/job-search/mock-interview",
    modelName: "Mock Interview",
  },
];
const Page = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Job Search"
        desc="Explore a variety of tools for all your job search needs."
        tools={tools}
      />
    </PageLayout>
  );
};

export default Page;
