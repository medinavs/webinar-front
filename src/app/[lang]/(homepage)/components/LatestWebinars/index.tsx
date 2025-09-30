import { FC } from "react";
import { LatestWebinarsProps } from "./types";
import { AvatarWebinarCard } from "@/components/common/AvatarWebinarCard";

export const LatestWebinars: FC<LatestWebinarsProps> = ({ webinars }) => {
  const latestUserWebinarView = true;
  const userId = "123";

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden">
      <p className="text-sm text-gray-100">Webinars mais recentes</p>
      <section className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[650px] [&::-webkit-scrollbar]:hidden">
        {webinars
          ? webinars.map((webinar) => (
              <AvatarWebinarCard key={webinar.id} webinar={webinar} />
            ))
          : null}
      </section>
    </div>
  );
};
