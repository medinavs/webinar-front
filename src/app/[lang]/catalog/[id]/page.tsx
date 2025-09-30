import { getDictionary } from "@/utils/dictionaries/getDictionary";
import { getMetaData } from "@/utils/seo/getMetaData";
import type { NextPage } from "next";
import { Sidebar } from "@/components/common/Sidebar";
import { api } from "@/instances/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CatalogDynamicPage } from "./types";
import { Content } from "./components/Content";

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Webinar Details",
    description: "Your gateway to seamless webinar experiences.",
    image: "",
    url: "/",
  });
}

const IMAGE_SIZES = {
  lg: {
    width: 320,
    height: 450,
  },
};

const Page: NextPage<CatalogDynamicPage> = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt"; id: string }>;
}) => {
  const { lang, id } = await params;

  const sessionCookie = (await cookies()).get("better-auth.session_token");

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  const dictionary = await getDictionary(lang);

  const data = await api.webinars.findById(id);

  return (
    <div className="flex h-screen bg-gray-800 p-4 text-gray-100">
      <Sidebar dictionary={dictionary} />
      <div className="w-full h-[calc(100vh-2rem)] max-w-[996px] mx-auto pt-10">
        <main className="flex flex-col w-full h-full overflow-hidden">
          <Content data={data ?? []} dictionary={dictionary} lang={lang} />
        </main>
      </div>
    </div>
  );
};

export default Page;
