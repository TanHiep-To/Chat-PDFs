"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UploadButton, UploadDropzone } from "./UploadthingUI";

const FileUpload = () => {
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
      <DialogContent>
        <DialogTitle>
          <VisuallyHidden>Upload your PDF</VisuallyHidden>
        </DialogTitle>
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />

        <UploadDropzone
          className="w-[200px] h-[200px]"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
