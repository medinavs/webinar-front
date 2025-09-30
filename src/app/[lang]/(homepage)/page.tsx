import { getDictionary } from "@/utils/dictionaries/getDictionary";
import { getMetaData } from "@/utils/seo/getMetaData";
import type { NextPage } from "next";
import { HomeDynamicPage } from "./types";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "./components/Header";
import { LatestWebinars } from "./components/LatestWebinars";
import { PopularWebinars } from "./components/PopularWebinars";
import { api } from "@/instances/api";
import { Webinar } from "@/types/common/webinar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const revalidate = 60;

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Home",
    description: "Your gateway to seamless webinar experiences.",
    image: "",
    url: "/",
  });
}

const Page: NextPage<HomeDynamicPage> = async ({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) => {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const sessionCookie = (await cookies()).get("better-auth.session_token");

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  const data: {
    webinars: Webinar[];
  } = await api.webinars.findRecents();

  const popularWebinarsData: {
    webinars: Webinar[];
  } = await api.webinars.findPopulars();

  return (
    <div className="flex h-screen bg-gray-800 p-4 text-gray-100">
      <Sidebar dictionary={dictionary} />
      <div className="w-full h-[calc(100vh-1rem)] max-w-[996px] mx-auto pt-16">
        <section className="grid grid-cols-[1fr_308px] h-full gap-[64px] overflow-hidden w-full">
          <div>
            <Header dictionary={dictionary} />
            <LatestWebinars
              webinars={data.webinars}
              dictionary={dictionary}
              lang={lang}
            />
          </div>
          <PopularWebinars
            popularWebinars={popularWebinarsData.webinars || []}
            dictionary={dictionary}
            lang={lang}
          />
        </section>
      </div>
    </div>
  );
};

export default Page;
