import { Body, Header, Layout } from "@/components/Layout";
import Navbar from "@/components/NavBar";
import Pricing from "@/components/Pricing";

const page = async () => {
  return (
    <Layout>
      <Header sticky>
        <Navbar />
      </Header>

      <Body>
        <div className="flex  flex-1 flex-col justify-between">
          <Pricing />
        </div>
      </Body>
    </Layout>
  );
};

export default page;
