"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileItem } from "@/components/common/ProfileItem";
import { ChartNoAxesCombined, FileVideoCamera } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { User } from "@/types/common/user";
import { ProfileDetailsProps } from "./types";

export const ProfileDetails: FC<ProfileDetailsProps> = ({ webinarsCount }) => {
  const { user } = useSession();

  const profile = user || ({} as User);

  const memberSinceYear = new Date(profile.createdAt).getFullYear();

  return (
    <div className="flex flex-col items-center border-l border-l-gray-700 h-max mt-16 pb-10">
      <div className="flex flex-col items-center ">
        <Avatar className="w-20 h-20">
          <AvatarImage alt={profile.name} src={profile.image ?? ""} />
          <AvatarFallback className="bg-gray-600 text-gray-300">
            {profile.name && profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-4 font-bold text-gray-100 text-xl">{profile.name}</h2>
        <p className="text-gray-400 text-sm mt-1">
          membro desde de {memberSinceYear}
        </p>
      </div>
      <div className="block w-8 h-1 rounded-full mt-10 bg-gradient-to-r from-green-100 to-purple-100" />
      <div className="flex flex-col gap-10 mt-12">
        <ProfileItem
          icon={<FileVideoCamera />}
          info={webinarsCount || 0}
          label="Webinar(s) assistidos"
        />
      </div>
    </div>
  );
};
