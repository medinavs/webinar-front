"use client";
import { FC } from "react";
import { Globe, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ContentProps } from "./types";
import { useSession } from "@/hooks/use-session";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileSchema } from "./schema";
import { cn } from "@/lib/utils";
import { Input } from "@/components/common/Input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/instances/api";
import { toast } from "sonner";

export const Content: FC<ContentProps> = ({ dictionary }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();
  const currentLang = pathname.split("/")[1] || "pt";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      image: user?.image ?? "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (data: ProfileFormData) => {
      await api.account.auth.updateUser({
        name: data.name,
        image: data.image,
      });
    },
    onSuccess: () => {
      toast.success(dictionary.update_user_success_message);
      reset();
      window.location.reload();
    },
    onError: () => {
      toast.error(dictionary.update_user_error);
    },
  });

  const handleLanguageChange = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
  };

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-6 bg-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-10 text-green-200 flex items-center justify-center">
            <User className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              {dictionary.update_profile || "Atualizar Perfil"}
            </h2>
            <p className="text-sm text-gray-300">
              {dictionary.update_your_personal_information ||
                "Atualize suas informações pessoais"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              {dictionary.name || "Nome"}
            </label>
            <Input
              {...register("name")}
              id="name"
              type="text"
              className={cn(errors.name ? "border-red-400" : "")}
              placeholder={dictionary.your_name}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {dictionary.name_too_short}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              {dictionary.profile_image || "Imagem de perfil"}{" "}
              <span className="text-gray-300">
                ({dictionary.optional || "opcional"})
              </span>
            </label>
            <Input
              {...register("image")}
              id="image"
              type="url"
              className={cn(errors.image ? "border-red-400" : "")}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.image && (
              <p className="text-red-400 text-xs mt-1">
                {dictionary.invalid_url || "URL inválida"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={false}
            className={cn(
              "w-full px-6 py-2.5 rounded-lg font-semibold text-base cursor-pointer",
              "transition-all duration-300 shadow-sm",
              "border flex items-center justify-center gap-2",
              "bg-green-200 border-green-200 text-gray-900",
              "hover:bg-green-200/80 hover:border-green-300 hover:shadow-md",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            )}
          >
            {updateProfileMutation.isPending
              ? dictionary.updating || "Atualizando..."
              : dictionary.save_changes || "Salvar Alterações"}
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6 bg-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-10 text-green-200 flex items-center justify-center">
            <Globe className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              {dictionary.change_language}
            </h2>
            <p className="text-sm text-gray-300">
              {dictionary.choose_your_preferred_language}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => handleLanguageChange("pt")}
            className={cn(
              "px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200",
              currentLang === "pt"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400 hover:border-gray-500"
            )}
          >
            Português
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={cn(
              "px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200",
              currentLang === "en"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400 hover:border-gray-500"
            )}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};
