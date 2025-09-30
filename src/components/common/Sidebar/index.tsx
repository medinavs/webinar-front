"use client";

import {
  LogOut,
  Settings,
  Telescope,
  TrendingUp,
  User,
  Waypoints,
} from "lucide-react";
import { FC } from "react";
import { MenuItem } from "./MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/instances/api";
import { SidebarProps } from "./types";

export const Sidebar: FC<SidebarProps> = ({ dictionary }) => {
  const pathName = usePathname();
  const { user } = useSession();
  const router = useRouter();

  const lang = pathName.split("/")[1] || "pt";

  function getLimitedName(name?: string, fallback: string = "Usuário") {
    if (!name) return fallback;
    return name.length > 18 ? name.slice(0, 15) + "..." : name;
  }

  const menuItems = [
    {
      icon: (
        <TrendingUp
          className={`${pathName !== `/${lang}` && "text-gray-400"}`}
        />
      ),
      label: dictionary.home,
      to: `/${lang}`,
    },
    {
      icon: (
        <Telescope
          className={`${!pathName.endsWith("/catalog") && "text-gray-400"}`}
        />
      ),
      label: dictionary.catalog,
      to: `/${lang}/catalog`,
    },
    {
      icon: (
        <User className={`${!pathName.endsWith("/me") && "text-gray-400"}`} />
      ),
      label: dictionary.my_profile,
      to: `/${lang}/me/${user?.id || ""}`,
    },
    {
      icon: (
        <Settings
          className={`${pathName !== "/settings" && "text-gray-400"}`}
        />
      ),
      label: dictionary.settings,
      to: `/${lang}/settings`,
    },
  ];

  const handleSignOut = async () => {
    await api.account.auth.signOut();
    router.push(`/sign-in`);
  };

  return (
    <aside className="flex flex-col w-64 h-[calc(100dvh - 1rem)] rounded-lg bg-sidebar-gradient items-center justify-between p-1">
      <div className="flex flex-col items-center gap-28">
        <div className="flex items-center gap-2">
          <Waypoints className="size-5" />
          <h2 className="text-xl font-bold mb-0.5 bg-gradient-to-r from-green-100 to-purple-100 text-transparent bg-clip-text">
            WebinarConnect
          </h2>
        </div>
        <nav>
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                selected={pathName === item.to}
                to={item.to}
              />
            ))}
          </ul>
        </nav>
      </div>
      <footer className="flex items-center gap-6 pb-4">
        <div className="flex items-center gap-2">
          <Avatar
            className="w-8 h-8 mb-0.5 cursor-pointer"
            onClick={() => router.push(`/${lang}/me/${user?.id || ""}`)}
          >
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback className="bg-gray-600 text-gray-300">
              {user?.name ? user.name.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray-300">{getLimitedName(user?.name)}</p>
        </div>
        <LogOut
          className="size-5 text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={handleSignOut}
        />
      </footer>
    </aside>
  );
};
