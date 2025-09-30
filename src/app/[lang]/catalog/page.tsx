import { getDictionary } from "@/utils/dictionaries/getDictionary";
import { getMetaData } from "@/utils/seo/getMetaData";
import type { NextPage } from "next";
import { HomeDynamicPage } from "./types";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "./components/Header";
import { CategoriesFilter } from "./components/CategoriesFilter";
import { WebinarsList } from "./components/WebinarsList";
import { api } from "@/instances/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Catalog",
    description: "Your gateway to seamless webinar experiences.",
    image: "",
    url: "/en/catalog",
  });
}

const Page: NextPage<HomeDynamicPage> = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) => {
  const { lang } = await params;

  const sessionCookie = (await cookies()).get("better-auth.session_token");

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  const dictionary = await getDictionary(lang);

  const categoriesData = await api.categories.findAll({});
  const webinarsData = await api.webinars.findAll({ filters: {} });

  const categories = categoriesData?.categories || [];

  return (
    <div className="flex h-screen bg-gray-800 p-4 text-gray-100">
      <Sidebar dictionary={dictionary} />
      <div className="w-full h-[calc(100vh-1rem)] max-w-[996px] mx-auto pt-16">
        <main className="flex flex-col w-full h-full overflow-hidden">
          <Header dictionary={dictionary} />
          <CategoriesFilter categories={categories} dictionary={dictionary} />
          <WebinarsList
            data={webinarsData}
            dictionary={dictionary}
            lang={lang}
          />
        </main>
      </div>
    </div>
  );
};

export default Page;
