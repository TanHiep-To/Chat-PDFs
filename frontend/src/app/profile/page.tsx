import Profile from "@/components/Profile";
import React from "react";
import { Body, Header, Layout } from "@/components/Layout";
import Navbar from "@/components/NavBar";

export default function page() {
  return (
    <Layout>
      <Header sticky>
        <Navbar />
      </Header>

      <Body>
        <div className="flex  flex-1 flex-col justify-between">
          <Profile />
        </div>
      </Body>
    </Layout>
  );
}
