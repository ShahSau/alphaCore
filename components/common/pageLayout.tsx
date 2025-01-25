"use client";
import React, { ReactNode } from "react";
import { useSidebarToggle } from "@/hooks/use-pro-modal";
import { motion } from "framer-motion";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const open = useSidebarToggle((state) => state.isOpen);
  return (
    <motion.div
      className={`${open ? "md:ml-72" : "md:ml-16"}`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      initial={{ marginLeft: 288 }}
      animate={{ marginLeft: open ? 288 : 64 }}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
