"use client";

import * as z from "zod";
import React, { useState } from 'react'
import Heading from '@/components/heading';
import { MoveUpRight, Ratio } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image"

const PortraitPage = () => {
    const router = useRouter()
    const [images, setImages] = useState<string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages("");

            const response = await axios.post('/api/portrait', values);
            setImages(response.data);
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
            title="Portrait Generation"
            description="Turn your text into a portrait."
            icon={Ratio}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
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
                                        placeholder="a latina woman in casual clothes, natural skin, 8k uhd, high quality, film grain, Fujifilm XT3" 
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
                {images.length === 0 && !isLoading && (
                    <Empty label="No images are generated." />
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
                {images !== "" && (
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

export default PortraitPage;