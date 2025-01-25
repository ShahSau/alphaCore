"use client";

import * as z from "zod";
import React, { useState } from "react";
import Heading from "@/components/common/heading";
import { Newspaper } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema, languageOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/common/empty";
import { Loader } from "@/components/common/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/common/user-avatar";
import { BotAvatar } from "@/components/common/bot-avatar";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { NextResponse } from "next/server";
import { useProModal, useSidebarToggle } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import Typewrite from "@/components/TypeWrite";
import { motion } from "framer-motion";
import PageLayout from "@/components/common/pageLayout";

const ArticleSummery = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<string>("");
  const open = useSidebarToggle((state) => state.isOpen);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      lang: "en",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.setValue("prompt", "");

      const resposne = await axios.post("/api/article", {
        link: values.prompt,
        lang: values.lang,
      });

      setMessages(resposne.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <PageLayout>
      <Heading
        title="Article Summery"
        description="Summarizes the article after extracting it from the specified url."
        icon={Newspaper}
        iconColor="text-emerald-700"
        bgColor="bg-emerald-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                        rounded-lg border w-full 
                        p-4 px-3 md:px-6 focus-within:shadow-sm
                        grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-7">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter the link of the article to get the summery"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                size="icon"
              >
                Summery
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages === "" && !isLoading && (
            <Empty label={"No article to summarize"} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages !== "" && !isLoading && (
              <div
                key={messages}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10"
                )}
              >
                <BotAvatar />
                <Typewrite message={messages} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ArticleSummery;
