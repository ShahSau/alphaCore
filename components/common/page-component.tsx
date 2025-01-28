"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface toolsprops {
  label: string;
  icon: LucideIcon;
  href: string;
  color: string;
  bgColor: string;
  modelName: string;
}

interface PageComponentProps {
  title: string;
  desc: string;
  tools: toolsprops[];
}
const PageComponent = ({ title, desc, tools }: PageComponentProps) => {
  const router = useRouter();
  return (
    <>
      <div className="mb-8 spacce-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          {desc}
        </p>
      </div>

      <div className="px-4 md:px-20 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool: toolsprops, index: number) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.4, duration: 0.8 }}
          >
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-2 border-black/5 flex items-center 
              justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default PageComponent;
