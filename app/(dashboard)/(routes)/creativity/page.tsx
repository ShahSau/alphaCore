"use client";
import React from "react";
import PageComponent from "@/components/common/page-component";
import PageLayout from "@/components/common/pageLayout";
import { FerrisWheel, PlusCircle, FilePieChart } from "lucide-react";

const tools = [
  {
    label: "Contenent Generation",
    icon: PlusCircle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/creativity/content-generation",
    modelName: "Content Generation",
  },
  {
    label: "Contact Analyzer",
    icon: FilePieChart,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/job-search/interview-question",
    modelName: "Interview Question",
  }
];
const Page = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Creativity"
        desc="Explore a variety of tools for all your creativity needs."
        tools={tools}
      />
    </PageLayout>
  );
};

export default Page;
