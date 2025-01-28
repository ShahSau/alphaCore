"use client";

import * as z from "zod";
import React, { useState } from "react";
import Heading from "@/components/common/heading";
import { ClipboardList } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import PageLayout from "@/components/common/pageLayout";
import Typewrite from "@/components/TypeWrite";

const SummerizerPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const resposne = await axios.post("/api/summarizer", {
        messages: values.prompt,
        lang: values.lang,
      });

      setMessages((current) => [
        ...current,
        { role: "user", content: values.prompt },
        { role: "assistant", content: resposne.data },
      ]);
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
        title="Summerizer"
        description="Summarizes the article after extracting it from the specified url."
        icon={ClipboardList}
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
                        placeholder="
                                        Jupiter is the fifth planet from the Sun and the largest sol...."
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
                Summarize Text
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
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => {
              return message.role === "user" ? (
                <div
                  key={message.content}
                  className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10"
                >
                  <UserAvatar />
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              ) : (
                <div
                  key={message.content}
                  className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted"
                >
                  <BotAvatar />
                  <Typewrite message={message.content?.toLowerCase() || ""} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SummerizerPage;
