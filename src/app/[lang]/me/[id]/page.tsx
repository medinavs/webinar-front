import { getDictionary } from "@/utils/dictionaries/getDictionary";
import { getMetaData } from "@/utils/seo/getMetaData";
import type { NextPage } from "next";
import { Sidebar } from "@/components/common/Sidebar";
import { MeDynamicPage } from "./types";
import { Header } from "./components/Header";
import { SubscribedWebinars } from "./components/SubscribedWebinars";
import { ProfileDetails } from "./components/ProfileDetails";
import { api } from "@/instances/api";
import { User } from "@/types/common/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return getMetaData({
    title: "WebinarConnect | Profile",
    description: "Your webinars, your way.",
    image: "",
    url: "/",
  });
}

const Page: NextPage<MeDynamicPage> = async ({
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

  const data = await api.webinars.findRegisteredByUser(id);

  const webinars = data?.webinars || [];

  return (
    <div className="flex h-screen bg-gray-800 p-4 text-gray-100">
      <Sidebar />
      <div className="w-full h-[calc(100vh-1rem)] max-w-[996px] mx-auto pt-16">
        <main className="grid grid-cols-[1fr_308px] h-full gap-[64px] overflow-hidden">
          <section>
            <Header />
            <SubscribedWebinars webinars={webinars ?? []} />
          </section>
          <section>
            <ProfileDetails webinarsCount={webinars.length} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
