import { getMetaData } from "@/utils/seo/getMetaData";
import { NextPage } from "next";
import { AuthSection } from "./components/AuthSection";
import { LogoSection } from "./components/LogoSection";

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Sign In",
    description: "Your gateway to seamless webinar experiences.",
    image: "",
    url: "/",
  });
}

const Page: NextPage = async () => {
  return (
    <main className="grid grid-cols-[1.1fr_1fr] p-5 min-h-screen bg-gray-800">
      <LogoSection />
      <AuthSection />
    </main>
  );
};

export default Page;
