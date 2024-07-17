"use client";

import { useState } from "react";

import FileUploadDropzone from "./FileUploadDropzone";

import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const FileUploadButton = () => {
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
          {/* <VisuallyHidden.Root> */}
          <VisuallyHidden>Upload your PDF</VisuallyHidden>
          {/* </VisuallyHidden.Root> */}
        </DialogTitle>
        <FileUploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadButton;
