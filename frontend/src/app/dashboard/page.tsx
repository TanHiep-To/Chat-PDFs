import Navbar from "@/components/NavBar";
import { cookies } from "next/headers";
import React from "react";
import { Layout, Body, Header } from "@/components/Layout";
import { UploadDropzone } from "@/components/UploadthingUI";
import FileUpload from "@/components/FileUpload";
import { redirect } from "next/navigation";

export default async function page() {
  // const router = useRouter();
  const cookieStore = cookies();
  if (!cookieStore.get("token")) {
    redirect("/login");
  }
  // const data = await getFiles(token);
  // if (!data) {
  //   router.push("/not-found");
  // }

  //TODO: get files
  // const files = data.files;

  return (
    <Layout>
      <Header sticky>
        <Navbar
        // cookieStore={cookieStore}
        // setCookie={setCookie}
        // deleteCookie={deleteCookie}
        // user={user}
        />
      </Header>

      <Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Heres a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* <DataTable data={files} columns={columns} /> */}
          <FileUpload />
        </div>
      </Body>
    </Layout>
  );
}
