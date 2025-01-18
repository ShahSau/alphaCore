"use client";

import * as z from "zod";
import React, { useState } from 'react'
import Heading from '@/components/heading';
import { Database } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SqlPage = () => {
    const router = useRouter()
    const proModal = useProModal();
    const [messages, setMessages] =useState<ChatCompletionRequestMessage[]>([])
    const [copied, setCopied] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];
            
            const response = await axios.post('/api/sql', { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error:any) {
            if(error?.response?.status === 403){
                proModal.onOpen()
            }else{
                console.error(error)
                toast.error("Something went wrong. Please try again.")
            }
        }finally{
            router.refresh()
        }
    };

    const copyContent = (content: string) => {
        setCopied(true);
        toast.success("Copied to clipboard");
    };

  return (

    <div>
        <Heading 
            title="Natural language to SQL"
            description="Convert natural language into SQL queries."
            icon={Database}
            iconColor="text-red-700"
            bgColor="bg-red-700/10"
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
                                        placeholder="Write a SQL query which computes the average total order value for all orders on 2023-04-01." 
                                        {...field}
                                    />
                                    </FormControl>
                                 </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading || !form.formState.isValid} size="icon">
                            Generate queries
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
                    <Empty label="No queries generated." />
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message)=>(
                        <div 
                        key={message.content}
                        className={cn(
                            "p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user" ? "bg-white border border-black/10" : "bg-[#2B2B2B]",
                          )}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                            <div className="text-sm overflow-hidden leading-7 whitespace-pre-wrap">
                                {message.role === "user" ? (
                                        message.content || ""
                                    ) : (
                                        <>
                                            <SyntaxHighlighter 
                                                language="sql" style={a11yDark} 
                                                wrapLines={true}
                                                showLineNumbers={true}
                                                customStyle={{borderRadius: "0.5rem", padding: "1rem"}}
                                            >
                                                {message.content?.replace(/^```sql\s*|```$/g, '') || ""}
                                            </SyntaxHighlighter>
                                            <CopyToClipboard text={message.content || ""} onCopy={() => copyContent(message.content || "")}>
                                                <Button className="ml-2" variant="secondary">
                                                    {copied ? "Copied!" : "Copy"}
                                                 </Button>
                                            </CopyToClipboard>
                                        </>

                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SqlPage;