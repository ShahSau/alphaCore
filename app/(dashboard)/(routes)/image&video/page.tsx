"use client";
import React from "react";
import PageComponent from "@/components/common/page-component";
import PageLayout from "@/components/common/pageLayout";
import {
  ArchiveRestore,
  Feather,
  FileImage,
  Film,
  ImageMinus,
  Ratio,
  ShieldCheck,
  SquareKanban,
} from "lucide-react";

const tools = [
  {
    label: "Image Generation",
    icon: FileImage,
    href: "/image&video/image-generation",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    modelName: "Image Generation",
  },
  {
    label: "Portraiat Generation",
    icon: Ratio,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/portraiat-generation",
    modelName: "Portraiat Generation",
  },
  {
    label: "Logo Generation",
    icon: Feather,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/logo-generation",
    modelName: "Logo Generation",
  },
  {
    label: "Video Generation",
    icon: Film,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/video-generation",
    modelName: "Video Generation",
  },
  {
    label: "BG Removal",
    icon: ImageMinus,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/bg-removal",
    modelName: "BG Removal",
  },
  {
    label: "Image Restore",
    icon: ArchiveRestore,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/image-restore",
    modelName: "Image Restore",
  },
  {
    label: "Object Remove",
    icon: SquareKanban,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/object-remove",
    modelName: "Object Remove",
  },
  {
    label: "Image Enhance",
    icon: ShieldCheck,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image&video/image-enhance",
    modelName: "Image Enhance",
  },
];
const Page = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Image & Video"
        desc="Explore a variety of tools for generating and enhancing images and videos."
        tools={tools}
      />
    </PageLayout>
  );
};

export default Page;
