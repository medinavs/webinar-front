import { FC } from "react";
import { AvatarWebinarCardProps } from "./types";
import { getRelativeTimeString } from "@/utils/helpers/getRelativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { MAX_DESCRIPTION_LENGTH } from "@/constants/webinar/maxDescriptionLength";
import { ArrowRight, Clock } from "lucide-react";
import { getSplittedText } from "@/utils/helpers/getSplittedText";
import { UsersAvatar } from "../UsersAvatar";

export const AvatarWebinarCard: FC<AvatarWebinarCardProps> = ({
  webinar,
  dictionary,
  lang,
}) => {
  const distance = getRelativeTimeString(new Date(webinar.createdAt), lang);

  const webinarRegistrationsMapped = webinar.registrations
    ? webinar.registrations
        .map((reg) =>
          reg.user
            ? {
                id: reg.user.id,
                name: reg.user.name,
                image: reg.user.image ?? "",
              }
            : undefined
        )
        .filter(
          (user): user is { id: string; name: string; image: string } => !!user
        )
    : [];

  return (
    <div className="flex flex-col w-full rounded-xl p-6 bg-gray-700">
      <div className="flex items-start justify-between mb-8">
        <section className="flex items-center gap-4">
          <Link href={`/profile/${webinar.speakerId}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={webinar.speaker.image ?? ""}
                alt={webinar.speaker.name}
              />
              <AvatarFallback className="bg-gray-600 text-gray-300">
                {webinar.speaker.name && webinar.speaker.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <p className="text-sm text-gray-100">{webinar.speaker.name}</p>
            <p className="text-sm text-gray-400">{distance}</p>
          </div>
        </section>
        <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
          <Clock className="size-3.5 text-green-200" />
          <p className="text-xs font-medium text-gray-300">
            {webinar.duration}m
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <Link href={`/catalog/${webinar.id}`}>
          <Image
            width={108}
            height={152}
            quality={100}
            alt={webinar.title}
            src={webinar.imageUrl}
            className="min-w-[108px] min-h-[152px] rounded-sm object-cover transition duration-200 hover:brightness-125"
          />
        </Link>

        <div className="flex flex-col">
          <div>
            <h2 className="text-gray-100 text-base font-bold">
              {webinar.title}
            </h2>
            <p className="text-sm text-gray-400">{webinar.speaker.name}</p>
          </div>

          <p className="text-sm text-gray-300 mt-5">
            {getSplittedText(webinar.description, MAX_DESCRIPTION_LENGTH)}
            {webinar.description.length > MAX_DESCRIPTION_LENGTH && (
              <Link
                href={`/${lang}/catalog/${webinar.id}`}
                className="bg-none border-none text-[0.875rem] text-purple-100 font-bold ml-1"
              >
                {dictionary.view_more}
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="flex mt-4 items-center justify-between">
        <UsersAvatar users={webinarRegistrationsMapped} maxAvatarsToShow={4} />
        <Link
          href={`/${lang}/catalog/${webinar.id}`}
          className="flex items-center gap-2 text-sm text-green-200 font-medium group"
        >
          <span>{dictionary.view_details}</span>
          <ArrowRight className="size-4 mt-0.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
