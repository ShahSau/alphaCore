"use client";

import * as z from "zod";
import React, { useState } from "react";
import Heading from "@/components/common/heading";
import { ArrowLeft, FileCode2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema, languageOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import PageLayout from "@/components/common/pageLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard"; //////////
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CodeConvertionPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      fromLang: "JS",
      toLang: "Python",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/code-convertion", {
        messages: userMessage.content,
        fromlang: values.fromLang,
        tolang: values.toLang,
      });

      setMessages((current) => [...current, userMessage, response.data]);

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

  const copyContent = () => {
    setCopied(true);
    toast.success("Copied to clipboard");
  };

  return (
    <PageLayout>
      <Button
        className="mb-4 ml-6"
        onClick={() => router.push("/programming")}
        variant="ghost"
      >
        <ArrowLeft size={24} />
      </Button>
      <Heading
        title="Code convertion"
        description="Summarize your code into a simple explanation."
        icon={FileCode2}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter the code to convert"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromLang"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
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
              <FormField
                control={form.control}
                name="toLang"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
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
                Convert the code
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
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start  rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10 gap-x-8 p-8 "
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                {message.role === "user" ? (
                  <p className="text-md">{message.content}</p>
                ) : (
                  <div className="w-full ml-4 text-md mb-6">
                    <SyntaxHighlighter
                      language={
                        message.content?.match(/```(\w+)/)?.[1] || "plaintext"
                      }
                      style={a11yDark}
                      className="rounded-lg p-4 w-full"
                      wrapLines={true}
                      showLineNumbers={true}
                      customStyle={{
                        borderRadius: "0.5rem",
                        padding: "1rem",
                      }}
                    >
                      {message.content || ""}
                    </SyntaxHighlighter>
                    <div className="mt-1 absolute right-8">
                      <CopyToClipboard
                        text={
                          message.content?.replace(/^```jsx\s*|```$/g, "") || ""
                        }
                        onCopy={() => copyContent()}
                      >
                        <Button className="w-full" variant="default">
                          Copy Code
                        </Button>
                      </CopyToClipboard>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CodeConvertionPage;
