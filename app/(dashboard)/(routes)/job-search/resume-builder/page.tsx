"use client";

import React from "react";
import Heading from "@/components/common/heading";
import { ArrowLeft, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import PageLayout from "@/components/common/pageLayout";
import { ResumeBuilder } from "./resume-builder";

const ResumeBuildPage = () => {
  const router = useRouter();
  const proModal = useProModal();

  return (
    <PageLayout>
      <Button
        className="mb-4 ml-6"
        onClick={() => router.push("/job-search")}
        variant="ghost"
      >
        <ArrowLeft size={24} />
      </Button>
      <Heading
        title="Resume Builder"
        description="Create a professional resume in minutes."
        icon={FileImage}
        iconColor="text-red-700"
        bgColor="bg-red-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <ResumeBuilder />
        </div>
        <div className="space-y-4 mt-4"></div>
      </div>
    </PageLayout>
  );
};

export default ResumeBuildPage;
