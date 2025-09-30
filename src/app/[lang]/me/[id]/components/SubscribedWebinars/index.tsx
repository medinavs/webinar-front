"use client";
import { ProfileWebinarCard } from "@/components/common/ProfileWebinarCard";
import { FC } from "react";
import { SubscribedWebinarsProps } from "./types";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/instances/api";
import { Webinar } from "@/types/common/webinar";

export const SubscribedWebinars: FC<SubscribedWebinarsProps> = ({
  data,
  dictionary,
  lang,
  userId,
}) => {
  const searchParams = useSearchParams();

  const { data: webinarsData } = useQuery<{
    webinars: Webinar[];
  }>({
    queryKey: ["webinars", searchParams.get("search")],
    queryFn: async () => {
      return await api.webinars.findRegisteredByUser(
        userId,
        searchParams.get("search") || undefined
      );
    },
    initialData: data,
  });

  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:hidden">
      {webinarsData && webinarsData.webinars.length > 0 ? (
        webinarsData.webinars.map((webinar) => (
          <ProfileWebinarCard
            key={webinar.id}
            webinar={webinar}
            dictionary={dictionary}
            lang={lang}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          {dictionary.no_subscriptions}
        </div>
      )}
    </div>
  );
};
