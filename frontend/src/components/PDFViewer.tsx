import { useState } from "react";

import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Expand, Loader2 } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
interface Props {
  url: string;
}

const PDFViewer = ({ url }: Props) => {
  const [numberPages, setNumberPages] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width, ref } = useResizeDetector();
  // const { toast } = useToast();

  const changePage = (offset: number) => {
    setNumberPages((prevPageNumber) => prevPageNumber + offset);
  };
  const previousPage = () => {
    changePage(-1);
  };
  const nextPage = () => {
    changePage(+1);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visibility) => {
        if (!visibility) {
          setIsOpen(visibility);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          aria-label="full screen"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-7xl">
        <DialogTitle>
          <VisuallyHidden>PDF Viewer</VisuallyHidden>
        </DialogTitle>
        <SimpleBar
          autoHide={false}
          className="mt-6 max-h-[calc(100vh-10rem)] overflow-y-scroll"
        >
          <div ref={ref}>
            <Document
              file={url}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-8 w-8 animate-spin text-primary" />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumberPages(numPages)}
              onLoadError={(error) => {
                // toast({
                //   variant: "destructive",
                //   title: "Failed to load PDF",
                //   description: error.message,
                // });
                console.error("Error loading PDF", error);
              }}
              className=" max-h-full"
            >
              {new Array(numberPages).fill(0).map((_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  scale={1}
                  width={width ? width : 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;
