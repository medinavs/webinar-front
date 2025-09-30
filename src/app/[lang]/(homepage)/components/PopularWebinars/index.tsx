import Link from "next/link";
import { FC } from "react";
import { PopularWebinarsProps } from "./types";
import { FeaturedWebinar } from "@/components/common/FeaturedWebinar";

export const PopularWebinars: FC<PopularWebinarsProps> = ({
  popularWebinars,
  dictionary,
  lang,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 mt-[74px]">
      <header className="flex items-center justify-between">
        <p className="text-sm text-gray-100">{dictionary.popular_webinars}</p>
        <Link
          href={"/catalog"}
          className="text-sm text-purple-100 hover:text-purple-200 transition-colors duration-200 font-medium"
        >
          {dictionary.view_all}
        </Link>
      </header>

      <section className="flex flex-col gap-3">
        {popularWebinars
          ? popularWebinars.map((webinar) => (
              <FeaturedWebinar
                key={`popular-${webinar.id}`}
                webinar={webinar}
                dictionary={dictionary}
                lang={lang}
              />
            ))
          : null}
      </section>
    </div>
  );
};
