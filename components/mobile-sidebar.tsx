"use client";

import { Menu } from "lucide-react";
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export const MobileSidebar = ({
  apiLimitCount=0,
  isPro = false,
}:{
  apiLimitCount: number
  isPro: boolean
}) => {
  const[isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  },[])

  if(!isMounted) {
    return null;
  } 

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6 md:hidden"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 overflow-scroll bg-[#111827]" >
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} /> 
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
