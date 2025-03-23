"use client";

import * as z from "zod";
import React, { useState } from "react";
import Heading from "@/components/common/heading";
import { MoveUpRight, Ratio, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  formSchema,
  genderOptions,
  ageOptions,
  ethnicityOptions,
} from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/common/empty";
import { Loader } from "@/components/common/loader";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import Controls from "@/components/ImageComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PageLayout from "@/components/common/pageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PortraitPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [imageUrl, setImageUrl] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "female",
      age: "20s",
      ethnicity: "latin_american",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImageUrl("");
      
      const response = await axios.post("/api/image&video/portrait", {
        gender: values.gender,
        age: values.age,
        ethnicity: values.ethnicity
      });

      
      // The backend now returns a base64 data URL
      setImageUrl(response.data);
      
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.error("Error generating portrait:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      router.refresh();
    }
  };

  const downloadImage = async (url: string) => {
    try {
      // For base64 images
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-portrait.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
      toast.error("Error downloading the image. Please try again.");
    }
  };

  return (
    <PageLayout>
      <Heading
        title="Portrait Generation"
        description="Generate realistic portraits based on gender, age, and ethnicity."
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
                grid grid-cols-12 gap-2"
            >
              <FormField
                control={form.control}
                name="gender"
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
                        {genderOptions.map((option) => (
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
                name="age"
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
                        {ageOptions.map((option) => (
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
                name="ethnicity"
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
                        {ethnicityOptions.map((option) => (
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
                className="col-span-12 lg:col-span-3 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
            {imageUrl && !isLoading && (
              <Card key={imageUrl} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <TransformWrapper initialScale={1}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <>
                        <Controls />
                        <TransformComponent>
                          <div className="w-full h-full">
                            <Image
                              alt="Generated Portrait"
                              src={imageUrl}
                              width={1000}
                              height={1000}
                              className="object-cover w-screen h-screen"
                              unoptimized={true} // Important for base64 images
                            />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(imageUrl, '_blank')}
                    variant="secondary"
                    className="w-full m-2"
                  >
                    Open
                    <MoveUpRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() => downloadImage(imageUrl)}
                    variant="default"
                    className="w-full m-2"
                  >
                    Download
                    <Download className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PortraitPage;