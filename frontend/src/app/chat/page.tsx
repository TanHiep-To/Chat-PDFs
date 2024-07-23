import { notFound, redirect } from "next/navigation";

import RenderPDF from "@/components/RenderPDF";
// import WrapChat from "@/components/Chat/WrapChat/WrapChat";

interface PageProps {
  params: {
    fileId: string;
  };
}

const page = async () => {
  // const { fileId } = params;

  // search for file in database with userId
  const url =
    "https://utfs.io/f/c0073245-a714-4654-9325-8694c523bc76-x4ydux.pdf";
  return (
    <div className="flex h-[calc(100vh-112px)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <RenderPDF url={url} />
          </div>
        </div>
        {/* 
        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <WrapChat fileId={file.id} />
        </div> */}
      </div>
    </div>
  );
};

export default page;
