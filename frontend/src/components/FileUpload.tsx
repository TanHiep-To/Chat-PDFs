"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UploadButton, UploadDropzone } from "./UploadthingUI";

const FileUpload = (
  { refetch }: { refetch: () => void } = { refetch: () => {} }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>Upload your PDF</Button>
      </DialogTrigger>
      <DialogContent
        className={isOpen ? "animate-fade-in " : "animate-fade-out hidden"}
      >
        <DialogTitle>
          <VisuallyHidden>Upload your PDF</VisuallyHidden>
        </DialogTitle>
        <UploadDropzone
          className="w-full h-[200px] text-white bg-gray-800"
          endpoint="pdfUploader"
          skipPolling={false}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            window.location.reload();
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          // onDrop={(files) => {
          //   console.log("Files: ", files);
          // }}
          // onUploadBegin={() => {
          //   console.log("Upload started");
          // }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
