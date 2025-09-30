"use client";

import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { WebinarsListProps } from "./types";
import { WebinarCard } from "@/components/common/WebinarCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/instances/api";
import { Webinar } from "@/types/common/webinar";
import { useSearchParams } from "next/navigation";

export const WebinarsList: FC<WebinarsListProps> = ({
  data,
  dictionary,
  lang,
}) => {
  const searchParams = useSearchParams();

  const { data: webinarsData } = useQuery({
    queryKey: [
      "webinars",
      searchParams.get("category"),
      searchParams.get("search"),
      searchParams.get("language"),
    ],
    queryFn: async () => {
      return await api.webinars.findAll({
        filters: {
          category: searchParams.get("category") || undefined,
          language: searchParams.get("language") || undefined,
          search: searchParams.get("search") || undefined,
        },
      });
    },
    initialData: data,
  });

  return (
    <div
      className={cn(
        "grid h-full grid-cols-3 [grid-auto-rows:188px] gap-5 overflow-y-auto pb-10",
        "[&::-webkit-scrollbar]:hidden"
      )}
    >
      {webinarsData?.webinars?.map((webinar: Webinar) => (
        <WebinarCard
          key={webinar.id}
          webinar={webinar}
          size="lg"
          dictionary={dictionary}
          lang={lang}
        />
      ))}
    </div>
  );
};
