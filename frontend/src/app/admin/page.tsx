import Admin from "@/components/Admin/Admin";
import { Body, Header, Layout } from "@/components/Layout";
import { DataTable } from "@/components/Admin/DataTable";
import Navbar from "@/components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { getUsers } from "./actions";
import { columns } from "@/components/Admin/Columns";

export default async function page() {
  const cookieStore = cookies();
  if (!cookieStore.get("token")) {
    redirect("/login");
  }
  const token = cookieStore.get("token")!.value || "";
  const users = await getUsers(token);

  return (
    <Layout>
      <Header sticky>
        <Navbar />
      </Header>

      <Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">All the users are here!</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>There are XXX users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Admin />
            </CardContent>
          </Card> */}
          <DataTable data={users} columns={columns} />
        </div>
      </Body>
    </Layout>
  );
}
