import RenderPDF from "@/components/RenderPDF";
import { getFileByFileId } from "./actions";
import { cookies } from "next/headers";
import ChatBox from "@/components/Chat/ChatBox";
import { redirect } from "next/navigation";
import { Layout, Body, Header } from "@/components/Layout";
import Navbar from "@/components/NavBar";

interface PageProps {
  params: {
    fileId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fileId } = params;
  const cookieStore = cookies();
  if (!cookieStore.get("token")) {
    redirect("/login");
  }
  const token: string = cookieStore.get("token")!.value || "";

  const data = await getFileByFileId(fileId, token);
  if (!data || data.success === false) {
    console.log("file not found");
    redirect("/not-found");
  }

  const url = data.url;

  return (
    <Layout>
      <Header sticky>
        <Navbar />
      </Header>

      <Body>
        <div className="flex h-[calc(100vh-112px)] flex-1 flex-col justify-between">
          <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
            <div className="flex-1 xl:flex">
              <div className="px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                <RenderPDF url={url} />
              </div>
            </div>

            <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
              <ChatBox fileId={fileId} token={token} />
            </div>
          </div>
        </div>
      </Body>
    </Layout>
  );
};

export default page;
