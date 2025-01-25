"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/common/pro-modal";

export const ModalProvider = () => {
  // from preventing hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};
