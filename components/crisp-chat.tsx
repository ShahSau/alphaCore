"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3d20890d-6618-4062-896d-9a69d27be4b4");
  }, []);

  return null;
};