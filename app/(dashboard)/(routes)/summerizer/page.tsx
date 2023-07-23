"use client";

import * as z from "zod";
import React, { useState } from 'react'
import Heading from '@/components/heading';
import { ClipboardList } from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from './constants' 
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import {Empty} from "@/components/empty"
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

  

const SummerizerPage = () => {
    const router = useRouter()
    const [messages, setMessages] =useState<ChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const options = {
            method: 'GET',
            url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
            params: {
              url: `${values.prompt}`,
              length: '3'
            },
            headers: {
              'X-RapidAPI-Key': '09cfa80fdfmshfab9bb2e6524034p10409ejsn8327b13fb216',
              'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
            }
          };
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];
            const response = await axios.request(options);
            setMessages((current) => [...current, userMessage, {role: "assistant", content: response.data.summary}]);
            
            form.reset();
            
        } catch (error) {
            console.error(error)
        }finally{
            router.refresh()
        }
    };

  return (

    <div>
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
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                    <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading} 
                                        placeholder="Enter the url of the article" 
                                        {...field}
                                    />
                                    </FormControl>
                                 </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Summerize
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
                    {messages.map((message)=>(
                        <div 
                        key={message.content}
                        className={cn(
                            "p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                          )}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                            <p className="text-sm whitespace-pre-wrap">
                                 {message.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SummerizerPage;