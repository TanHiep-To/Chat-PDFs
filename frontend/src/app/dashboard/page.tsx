"use client";

import FileUpload from "@/components/FileUpload";
import RenderPDF from "@/components/RenderPDF";
// import FileUploadButton1 from "@/components/FileUploadButton1";
// import { UploadButton } from "@/components/FileUploadButton1";
import React, { useRef } from "react";

export default function page() {
  // return <div>{/* <FileUpload /> */}
  // </div>;

  return (
    <div className="flex h-[calc(100vh-112px)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* <RenderPDF url={file.url} /> */}
          </div>
        </div>

        {/* <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <WrapChat fileId={file.id} />
        </div> */}
      </div>
    </div>
  );
}
