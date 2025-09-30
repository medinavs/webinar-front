import { getRelativeTimeString } from "@/utils/helpers/getRelativeTime";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ProfileWebinarCardProps } from "./types";
import { ArrowRight } from "lucide-react";

export const ProfileWebinarCard: FC<ProfileWebinarCardProps> = ({
  webinar,
  dictionary,
  lang,
}) => {
  const distance = getRelativeTimeString(
    new Date(webinar.registrationDate || webinar.createdAt),
    lang
  );

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm text-gray-300">{distance}</h3>

      <div className="flex flex-col gap-6 bg-gray-700 rounded-xl p-6">
        <div className="flex gap-6 ">
          <Link
            href={`/${lang}/catalog/${webinar.id}`}
            style={{ display: "flex" }}
          >
            <Image
              src={webinar.imageUrl}
              alt={webinar.title}
              width={98}
              height={134}
              className="min-w-[98px] object-cover rounded-lg transition duration-200 hover:brightness-110"
            />
          </Link>

          <section className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-100">
                {webinar.title}
              </h2>
              <p className="text-sm text-gray-400">{webinar.speaker.name}</p>
            </div>
          </section>
        </div>
        <p className="text-sm text-gray-300">{webinar.description}</p>
        <Link
          href={`/${lang}/catalog/${webinar.id}`}
          className="flex items-center gap-2 self-end text-sm text-green-200 font-medium group"
        >
          <span>{dictionary.view_details}</span>
          <ArrowRight className="size-4 mt-0.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
