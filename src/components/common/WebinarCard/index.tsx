import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { WebinarCardProps } from "./types";
import { ArrowRight, Calendar, Clock, List } from "lucide-react";
import Link from "next/link";
import { getSplittedText } from "@/utils/helpers/getSplittedText";
import { MAX_TITLE_LENGTH } from "@/constants/webinar/maxTitleLength";

const IMAGE_SIZES = {
  md: {
    width: 64,
    height: 94,
  },
  lg: {
    width: 108,
    height: 152,
  },
};

export const WebinarCard: FC<WebinarCardProps> = ({ webinar, size = "md" }) => {
  const currentSize = IMAGE_SIZES[size];

  return (
    <Link href={`/catalog/${webinar.id}`} className="block w-full">
      <div
        className={cn(
          "flex gap-5 px-4 py-5 bg-gray-700 rounded-xl cursor-pointer first:mt-2",
          "border border-gray-700/50 transition-all duration-300",
          "relative overflow-hidden group shadow-sm",
          "hover:border-gray-600 hover:shadow-md hover:translate-y-[-2px]"
        )}
      >
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={webinar.imageUrl}
            alt={webinar.title}
            width={currentSize.width}
            height={currentSize.height}
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              size === "md"
                ? "min-w-[64px] min-h-[94px]"
                : "min-w-[108px] min-h-[152px]"
            )}
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="flex font-bold text-base text-gray-100 overflow-hidden text-ellipsis line-clamp-2 [-webkit-box-orient:vertical] group-hover:text-green-100 transition-colors duration-300">
              {getSplittedText(webinar.title, MAX_TITLE_LENGTH)}
            </h3>
            <div className="mt-2 mb-4 flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                <Clock className="size-3.5 text-green-200" />
                <p className="text-xs font-medium text-gray-300">
                  {webinar.duration}m
                </p>
              </div>

              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                <Calendar className="size-3.5 text-green-200" />
                <p className="text-xs font-medium text-gray-300">
                  {new Date(webinar.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <List className="size-3.5 text-green-200" />
              <p className="text-xs font-medium text-gray-300">
                {webinar.category}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <span className="flex items-center gap-1 text-sm font-medium text-green-200 opacity-0 transform translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Ver detalhes
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
