import Navbar from "@/components/NavBar";
import { cookies } from "next/headers";
import React from "react";
import { Layout, Body, Header } from "@/components/Layout";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/Library/DataTable";
import { getFiles } from "./actions";
import { columns } from "@/components/Library/Columns";
import { useToast } from "@/components/ui/use-toast";

export default async function page() {
  const cookieStore = cookies();
  if (!cookieStore.get("token")) {
    redirect("/login");
  }
  const token = cookieStore.get("token")!.value || "";
  const files = await getFiles(token);
  if (!files || files.success === false) {
    console.log("files not found");
  }

  return (
    <Layout>
      <Header sticky>
        <Navbar />
      </Header>

      <Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Heres a list of your documents for you!
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={files} columns={columns} />
        </div>
      </Body>
    </Layout>
  );
}
