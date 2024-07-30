"use client";

import { useContext, useEffect, useState } from "react";

import { z } from "zod";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResizeDetector } from "react-resize-detector";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCw,
  SearchIcon,
} from "lucide-react";

import PDFViewer from "./PDFViewer";

import { cn } from "@/lib/utils";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import PDFInteract from "./PDFInteract";

if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

interface Props {
  url: string;
}

const File = ({ url, numberPages }: { url: string; numberPages?: number }) => {
  return (
    <Document
      // onMouseUp={handleMouseUp}
      file={url}
      // loading={
      //   <div className=" flex justify-center">
      //     <Loader2 className=" w-8 animate-spin text-primary" />
      //   </div>
      // }
      // onLoadSuccess={({ numPages }) => setNumberPages(numPages)}
      // onLoadError={() => {
      //   console.log("Error loading PDF");
      // return toast({
      //   title: "There was an error rendering the PDF",
      //   description: "Please try again later",
      //   variant: "destructive",
      // });
      // }}
      // className="max-h-full w-full"
    >
      {/* {isLoading && renderedScale ? (
                <Page
                  key={"page_scale" + currPage + renderedScale}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  width={width ? width : 1}
                  renderTextLayer={false}
                />
              ) : null} */}
      {Array.apply(null, Array(numberPages))
        .map((x, i) => i + 1)
        .map((page) => (
          <Page
            key={"page" + page}
            pageNumber={page}
            // width={width ? width : 1}
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-8 w-8 animate-spin text-primary" />
              </div>
            }
            // renderTextLayer={false}
            // renderAnnotationLayer={false}
            // customTextRenderer={false}
          />
        ))}
    </Document>
  );
};

const RenderPDF = ({ url }: Props) => {
  const [numberPages, setNumberPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const { width, ref } = useResizeDetector();
  const router = useRouter();
  const { user, token } = useContext(UserContext);

  const isLoading = renderedScale !== null && renderedScale !== scale;

  const CustomPageLoadValidator = z.object({
    index: z
      .string()
      .refine((val) => Number(val) > 0 && Number(val) <= numberPages!),
  });

  type CustomPageLoadType = z.infer<typeof CustomPageLoadValidator>;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CustomPageLoadType>({
    defaultValues: {
      index: "1",
    },
    resolver: zodResolver(CustomPageLoadValidator),
  });

  const handlePageSubmit = ({ index }: CustomPageLoadType) => {
    setCurrPage(Number(index));
    setValue("index", String(index));
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex  w-full items-center justify-between border-b border-zinc-200 px-1">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            aria-label="previous page"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("index", String(currPage - 1));
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Input
            {...register("index")}
            className={cn(
              "h-8 w-12",
              errors.index && "focus-visible:ring-red-500"
            )}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit(handlePageSubmit)();
              }
            }}
          />
          <p className="space-x-1 text-sm text-zinc-700">
            <span className="text-zinc-500">/</span>
            <span>
              {numberPages ?? (
                <Loader2 className="inline h-3 w-3 animate-spin" />
              )}
            </span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            aria-label="next page"
            disabled={numberPages === undefined || currPage === numberPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numberPages! ? numberPages! : prev + 1
              );
              setValue("index", String(currPage + 1));
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            aria-label="rotate"
            variant="ghost"
            size="sm"
            onClick={() => setRotation((prev) => prev + 90)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <PDFViewer url={url} />
        </div>
        <div className="space-x-2">
          {/* <div className="w-2 h-2">
            <PDFDownloadLink
              document={<File url={url} numberPages={numberPages} />}
              fileName={`${url.split("/").pop()}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="zoom in/out"
                variant="ghost"
                size="sm"
                className="gap-1.5"
              >
                <SearchIcon className="h-4 w-4" />
                {scale * 100}% <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(0.75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <PDFInteract
        // ref={ref}
        url={url}
        scale={scale}
        rotation={rotation}
        // width={width}
        numberPages={numberPages!}
        setNumberPages={setNumberPages}
      />
    </div>
  );
};

export default RenderPDF;
