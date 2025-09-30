import { ProfileWebinarCard } from "@/components/common/ProfileWebinarCard";
import { FC } from "react";
import { SubscribedWebinarsProps } from "./types";

export const SubscribedWebinars: FC<SubscribedWebinarsProps> = ({
  webinars,
}) => {
  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:hidden">
      {webinars && webinars.length > 0 ? (
        webinars.map((webinar) => (
          <ProfileWebinarCard key={webinar.id} webinar={webinar} />
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          Você ainda não está inscrito em nenhum webinar.
        </div>
      )}
    </div>
  );
};
