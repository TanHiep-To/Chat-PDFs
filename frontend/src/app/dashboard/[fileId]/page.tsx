import RenderPDF from "@/components/RenderPDF";
import { useEffect, useState } from "react";
import { getFileByFileId } from "./actions";
import { useRouter } from "next/router";
import { cookies } from "next/headers";
// import WrapChat from "@/components/Chat/WrapChat/WrapChat";

interface PageProps {
  params: {
    fileId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fileId } = params;
  const cookieStore = cookies();
  const token: string = (cookieStore.get("token") as unknown as string) || "";
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }

  const data = await getFileByFileId(fileId, token);
  if (!data) {
    router.push("/not-found");
  }

  const url = data.url;

  // search for file in database with userId
  // const url =
  // "https://utfs.io/f/c0073245-a714-4654-9325-8694c523bc76-x4ydux.pdf";

  // useEffect(() => {
  //   const handleGetFile = async () => {
  //     if (!token) {
  //       router.push("/login");
  //       return;
  //     }
  //     const res = await getFileByFileId(fileId, token);
  //     if (!res.url) {
  //       router.push("/not-found");
  //     }
  //     setUrl(url);
  //   };
  //   handleGetFile();
  // });
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
