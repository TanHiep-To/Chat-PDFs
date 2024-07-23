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
      <DialogContent
        className={isOpen ? "animate-fade-in " : "animate-fade-out hidden"}
      >
        <DialogTitle>
          <VisuallyHidden>Upload your PDF</VisuallyHidden>
        </DialogTitle>
        {/* <UploadButton
          className=" h-12 bg-black text-white"
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
        /> */}

        <UploadDropzone
          className="w-full h-[200px] text-white bg-gray-800"
          endpoint="pdfUploader"
          skipPolling={true}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
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
