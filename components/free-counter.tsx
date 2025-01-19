"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  // to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const proModal = useProModal();

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return (
      <div className="px-3 md:mb-4">
        <Card className="bg-white/10 border-0">
          <CardContent className="py-6">
            <div className="text-center text-sm text-white mb-4 space-y-2">
              <p>You have upgraded to pro plan</p>
            </div>
            <Button onClick={onClick} variant="premium" className="w-full">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-3 md:mb-4">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            {/* {mounted && (
              <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
            )} */}
          </div>
          <Button
            onClick={proModal.onOpen}
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
