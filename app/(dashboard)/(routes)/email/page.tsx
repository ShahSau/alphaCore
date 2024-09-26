"use client";

import * as z from "zod";
import React, { useState } from 'react'
import Heading from '@/components/heading';
import { MailPlus } from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from './constants' 
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useRouter } from "next/navigation";
import {Empty} from "@/components/empty"
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { moodOptions,languagesOptions,typeOptions } from "./constants";
import { ChatCompletionRequestMessage } from "openai";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const EamilPage = () => {
    const router = useRouter()
    const proModal = useProModal();
    const [email, setEmail] = useState<ChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: "",
            mood:"Choose the tone of your email",
            language:"Choose a language",
            type:"Choose the type of email",
            name:"",
            extra:"",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            const newMessages = [...email, userMessage];
            
            const response = await axios.post('/api/email', values);
            setEmail((current) => [...current, userMessage, response.data]);
            
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

  return (

    <div>
        <Heading 
            title="Email Response Generation"
            description="Generate email responses from a prompt."
            icon={MailPlus}
            iconColor="text-green-500"
            bgColor="bg-green-500/10"
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
                                        placeholder=" I am writing to propose a new marketing campaign that I believe will be effective for your business." 
                                        {...field}
                                    />
                                    </FormControl>
                                 </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="mood"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-4">
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
                                            {moodOptions.map((option) => (
                                                <SelectItem 
                                                    key={option.value} 
                                                    value={option.value}
                                                >
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
                            name="language"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-4">
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
                                            {languagesOptions.map((option) => (
                                                <SelectItem 
                                                    key={option.value} 
                                                    value={option.value}
                                                >
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
                            name="type"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-4">
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
                                            {typeOptions.map((option) => (
                                                <SelectItem 
                                                    key={option.value} 
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-4">
                                    <FormControl className="m-0 p-2">
                                    <Input
                                        className="border-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading} 
                                        placeholder="Your name*" 
                                        {...field}
                                    />
                                    </FormControl>
                                 </FormItem>
                            )}
                        />
                        <FormField
                            name="extra"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-4">
                                    <FormControl className="m-0 p-2">
                                    <Input
                                        className="border-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading} 
                                        placeholder="Any extra information" 
                                        {...field}
                                    />
                                    </FormControl>
                                 </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-4 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
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
                {!email && !isLoading && (
                    <Empty label="No Email response generated." />
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {email.map((message)=>(
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

export default EamilPage;