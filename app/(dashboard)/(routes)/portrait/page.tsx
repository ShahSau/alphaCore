"use client";

import * as z from "zod";
import React, { useState } from "react";
import Heading from "@/components/common/heading";
import { MoveUpRight, Ratio, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const PortraitPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [images, setImages] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages("");
      form.setValue("prompt", "");
      const response = await axios.post("/api/portrait", values);
      setImages(response.data.generated_image);
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
  const downloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generatedimage.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
      toast.error("Error downloading the image. Please try again.");
    }
  };

  return (
    <PageLayout>
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
              <Button
                className="col-span-12 lg:col-span-3 w-full"
                type="submit"
                disabled={isLoading || !form.formState.isValid}
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
            {images !== "" && !isLoading && (
              <Card key={images} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <TransformWrapper initialScale={1}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <>
                        <Controls />
                        <TransformComponent>
                          <div className="w-full h-full">
                            <Image
                              alt="Generated"
                              src={images}
                              width={1000}
                              height={1000}
                              className="object-cover w-screen h-screen"
                            />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(images)}
                    variant="secondary"
                    className="w-full m-2"
                  >
                    Open
                    <MoveUpRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() => downloadImage(images)}
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
