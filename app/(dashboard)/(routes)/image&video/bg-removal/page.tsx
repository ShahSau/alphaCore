"use client";

import React, { useState } from "react";
import Heading from "@/components/common/heading";
import {
  ImageMinus,
  ArrowLeft,
  UploadCloud,
  Download,
  MoveUpRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/common/loader";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import Controls from "@/components/ImageComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PageLayout from "@/components/common/pageLayout";

// Maximum file size for uploads (5MB)
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const BgRemovalPage = () => {
  const router = useRouter();
  const proModal = useProModal();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      toast.error(
        `Image is too big. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
      );
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResultImage("");
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResultImage("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsLoading(true);
      setResultImage("");

      const formData = new FormData();
      formData.append("image", file);

      console.log("Submitting form with file:", formData.get("image"));
      const response = await axios.post(
        "/api/bgremoval",
        formData,
      );
      console.log("API Response received:", response.data);
      setResultImage(response.data.generated_image);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.error("API Error:", error.response?.data || error.message);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const downloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "bg-removed-image.png";
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
      <Button
        className="mb-4 ml-6"
        onClick={() => router.push("/image&video")}
        variant="ghost"
      >
        <ArrowLeft size={24} />
      </Button>
      <Heading
        title="Background Removal"
        description="Upload an image to magically remove its background."
        icon={ImageMinus}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form
            onSubmit={onSubmit}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-4 items-center"
          >
            <div className="col-span-12 lg:col-span-9 flex items-center gap-4">
              <label className="flex items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <UploadCloud className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-600">
                    {file ? file.name : "Drop an image, or click to browse"}
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  disabled={isLoading}
                >
                  <X className="w-5 h-5 text-red-500" />
                </Button>
              )}
            </div>

            <Button
              className="col-span-12 lg:col-span-3 w-full"
              type="submit"
              disabled={isLoading || !file}
            >
              Remove Background
            </Button>
          </form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
            {preview && !resultImage && !isLoading && (
              <Card className="rounded-lg overflow-hidden border-dashed border-2">
                <div className="p-4 text-center font-medium text-muted-foreground border-b">
                  Original Image
                </div>
                <div className="relative aspect-square flex items-center justify-center bg-gray-50">
                  <Image
                    alt="Original Preview"
                    src={preview}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </Card>
            )}

            {resultImage !== "" && !isLoading && (
              <Card
                key={resultImage}
                className="rounded-lg overflow-hidden border"
              >
                <div
                  className="relative aspect-square w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), repeating-linear-gradient(45deg, #e5e7eb 25%, #f9fafb 25%, #f9fafb 75%, #e5e7eb 75%, #e5e7eb)",
                    backgroundPosition: "0 0, 10px 10px",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <TransformWrapper initialScale={1}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <>
                        <Controls />
                        <TransformComponent
                          wrapperClass="w-full h-full"
                          contentClass="w-full h-full"
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              alt="Generated without background"
                              src={resultImage}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                console.error(
                                  "Image failed to load:",
                                  resultImage,
                                );
                              }}
                            />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </div>
                <CardFooter className="p-2 bg-white">
                  <Button
                    onClick={() => window.open(resultImage)}
                    variant="secondary"
                    className="w-full m-2"
                  >
                    Open
                    <MoveUpRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() => downloadImage(resultImage)}
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

export default BgRemovalPage;
