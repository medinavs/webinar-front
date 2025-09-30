import { getDictionary } from "@/utils/dictionaries/getDictionary";
import { getMetaData } from "@/utils/seo/getMetaData";
import type { NextPage } from "next";
import { Sidebar } from "@/components/common/Sidebar";
import { SettingsDynamicPage } from "./types";
import { Header } from "./Header";
import { Content } from "./Content";
import { api } from "@/instances/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Settings",
    description: "Manage your account settings and preferences.",
    image: "",
    url: "/",
  });
}

const Page: NextPage<SettingsDynamicPage> = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; userId: string }>;
}) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const sessionCookie = (await cookies()).get("better-auth.session_token");

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-gray-800 p-4 text-gray-100">
      <Sidebar />
      <div className="w-full h-[calc(100vh-1rem)] max-w-[996px] mx-auto pt-16">
        <main className="flex flex-col w-full h-full overflow-hidden">
          <Header />
          <Content />
        </main>
      </div>
    </div>
  );
};

export default Page;
