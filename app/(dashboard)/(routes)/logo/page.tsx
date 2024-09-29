"use client";

import * as z from "zod";
import React, { useState } from 'react'
import Heading from '@/components/heading';
import { Feather, Download, MoveUpRight } from "lucide-react";
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
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image"
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const LogoPage = () => {
    const router = useRouter()
    const proModal = useProModal();
    const [images, setImages] = useState<string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages("");

            const response = await axios.post('/api/logo', values);
            setImages(response.data.generated_image);
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
            title="Logo Generation"
            description="Turn your promt into memorable logos."
            icon={Feather}
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
                                <FormItem className="col-span-12 lg:col-span-9">
                                    <FormControl className="m-0 p-0">
                                    <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading} 
                                        placeholder="paper plane logo with shadow of plane flying around the world" 
                                        {...field}
                                    />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                                        
                        <Button className="col-span-12 lg:col-span-3 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-20">
                        <Loader />
                    </div>
                )}
                {images === "" && !isLoading && (
                    <Empty label={"No logo generated"} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {images !== "" && !isLoading && (
                    <Card key={images} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                        <Image
                            fill
                            alt="Generated"
                            src={images}
                        />
                    </div>
                    <CardFooter className="p-2">
                        <Button onClick={() => window.open(images)} variant="secondary" className="w-full">
                        Open
                        <MoveUpRight className="h-4 w-4 mr-2" />
                        </Button>
                    </CardFooter>
                    </Card>
                )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default LogoPage;