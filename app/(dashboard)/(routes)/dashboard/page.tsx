"use client";
import { tools } from "@/constants";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/common/pageLayout";
import PageComponent from "@/components/common/page-component";

const DashBoardPage = () => {
  return (
    <PageLayout>
      <PageComponent
        title="Explore the power of AI"
        desc="Chat with the smartest AI - Experience the power of AI"
        tools={tools}
      />
    </PageLayout>
  );
};
export default DashBoardPage;
