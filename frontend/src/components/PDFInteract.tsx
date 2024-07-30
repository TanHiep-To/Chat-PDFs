import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PDFTextDropdown from "./PDFTextDropdown";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function PDFInteract({
  url,
  scale,
  rotation,
  numberPages,
  setNumberPages,
}: {
  url: string;
  scale: number;
  rotation: number;
  numberPages: number;
  setNumberPages: any;
}) {
  const [selectedText, setSelectedText] = React.useState<string>("");
  const [xCoordination, setXCoordination] = React.useState<number>(0);
  const [yCoordination, setYCoordination] = React.useState<number>(0);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selection.toString());
      // setXCoordination(selection.anchorNode!.parentElement!.offsetLeft || 0);
      // setYCoordination(selection.anchorNode!.parentElement!.offsetTop || 0);
      setXCoordination(Math.round(rect.left * 1.1));
      setYCoordination(Math.round(rect.top * 0.92));
      setMenuOpen(true);
    }
    if (selection?.toString() === "") {
      setMenuOpen(false);
    }
  };

  return (
    <div className="w-[800px] flex justify-center">
      <PDFTextDropdown
        menuOpen={menuOpen}
        selectedText={selectedText}
        xCoordination={xCoordination}
        yCoordination={yCoordination}
      />
      <SimpleBar
        autoHide={true}
        // className={cn(
        //   "w-[780px] flex max-h-[calc(100vh-10rem)] overflow-x-scroll overflow-y-scroll]",
        //   {
        //     "justify-center": scale <= 1,
        //     "justify-around": scale > 1,
        //   }
        // )}
        className="w-[880px] flex justify-left max-h-[calc(100vh-10rem)] overflow-x-scroll overflow-y-scroll"
      >
        <div>
          <Document
            // onMouseUp={handleMouseUp}
            file={url}
            loading={
              <div className=" flex justify-center">
                <Loader2 className=" w-8 animate-spin text-primary" />
              </div>
            }
            onLoadSuccess={({ numPages }) => setNumberPages(numPages)}
            onLoadError={() => {
              console.log("Error loading PDF");
              // return toast({
              //   title: "There was an error rendering the PDF",
              //   description: "Please try again later",
              //   variant: "destructive",
              // });
            }}
            className="max-h-full w-full"
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
                  onMouseUp={handleMouseUp}
                  key={"page" + page}
                  pageNumber={page}
                  scale={scale}
                  rotate={rotation}
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
        </div>
      </SimpleBar>
    </div>
  );
}
