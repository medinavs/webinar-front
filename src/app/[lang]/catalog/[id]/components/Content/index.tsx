"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { Clock, Calendar, User, Tag, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentProps } from "./types";
import { useSession } from "@/hooks/use-session";
import { api } from "@/instances/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscriptionFormData, subscriptionSchema } from "./schema";
import { Input } from "@/components/common/Input";

export const Content: FC<ContentProps> = ({ data, dictionary, lang }) => {
  const { user } = useSession();
  const { webinar } = data;

  const isUserAlreadySubscribed = webinar.registrations?.some(
    (registration) => registration.user?.id === user?.id
  );

  const [isSubscribed, setIsSubscribed] = useState(isUserAlreadySubscribed);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      linkedinURL: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationKey: ["subscribeWebinar"],
    mutationFn: async (formData: SubscriptionFormData) => {
      await api.webinars.registerUser({
        email: formData.email,
        name: formData.name,
        webinarId: webinar.id,
        linkedinURL: formData.linkedinURL ?? "",
      });
    },
    onSuccess: () => {
      toast.success(dictionary.subscribe_success_message);
      setIsSubscribed(true);
      setShowForm(false);
      reset();
    },
    onError: () => {
      toast.error(dictionary.subscribe_error_message);
    },
  });

  const onSubmit = (formData: SubscriptionFormData) => {
    subscribeMutation.mutate(formData);
  };

  const handleButtonClick = () => {
    if (!isSubscribed && !isUserAlreadySubscribed) {
      setShowForm(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100%-1rem)] bg-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={webinar.imageUrl}
          alt={webinar.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-gray-700/50 to-transparent" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="font-bold text-gray-100 text-2xl leading-tight">
              {webinar.title}
            </h1>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full shrink-0">
              <Clock className="size-4 text-green-200" />
              <span className="text-sm font-medium text-gray-300">
                {webinar.duration}m
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200/10">
              <User className="size-5 text-green-200" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                {dictionary.speaker}
              </p>
              <p className="text-sm font-medium text-gray-200">
                {webinar.speaker.name}
              </p>
            </div>
          </div>

          {webinar.date && (
            <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200/10">
                <Calendar className="size-5 text-green-200" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {dictionary.date}
                </p>
                <p className="text-sm font-medium text-gray-200">
                  {new Date(webinar.date).toLocaleDateString(lang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )}

          {webinar.category && (
            <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200/10">
                <Tag className="size-5 text-green-200" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {dictionary.category}
                </p>
                <p className="text-sm font-medium text-gray-200">
                  {webinar.category}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800/20 rounded-lg p-5 border border-gray-600/20">
          <h2 className="font-bold text-gray-100 text-lg mb-3 flex items-center gap-2">
            {dictionary.about_the_webinar}
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {webinar.description}
          </p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-600/30 bg-gray-800/50">
        {showForm && !isSubscribed ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-100 text-lg">
                {dictionary.fill_your_data}
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                {dictionary.full_name} *
              </label>
              <Input
                {...register("name")}
                id="name"
                type="text"
                className={cn(errors.name ? "border-red-400" : "")}
                placeholder={dictionary.full_name_placeholder}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {dictionary.name_too_short}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Email *
              </label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                className={cn(errors.email ? "border-red-400" : "")}
                placeholder="my@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {dictionary.invalid_email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="linkedinURL"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                LinkedIn (opcional)
              </label>
              <Input
                {...register("linkedinURL")}
                id="linkedinURL"
                type="url"
                className={cn(errors.linkedinURL ? "border-red-400" : "")}
                placeholder="https://linkedin.com/in/your-profile"
              />
              {errors.linkedinURL && (
                <p className="text-red-400 text-xs mt-1">
                  {dictionary.invalid_linkedin_url}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={subscribeMutation.isPending}
              className={cn(
                "w-full px-6 py-3 rounded-lg font-semibold text-base cursor-pointer",
                "transition-all duration-300 shadow-sm",
                "border flex items-center justify-center gap-2",
                "bg-green-200 border-green-200 text-gray-900",
                "hover:bg-green-200/80 hover:border-green-300 hover:shadow-md hover:translate-y-[-1px]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              )}
            >
              {subscribeMutation.isPending
                ? dictionary.subscribing
                : dictionary.confirm_subscribe_to_webinar}
            </button>
          </form>
        ) : (
          <button
            onClick={handleButtonClick}
            disabled={isUserAlreadySubscribed || isSubscribed}
            className={cn(
              "w-full px-6 py-3 rounded-lg font-semibold text-base",
              "transition-all duration-300 shadow-sm",
              "border flex items-center justify-center gap-2",
              isSubscribed || isUserAlreadySubscribed
                ? "bg-gray-800 border-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-200 border-green-200 text-gray-900 hover:bg-green-200/80 hover:border-green-300 hover:shadow-md hover:translate-y-[-1px] cursor-pointer"
            )}
          >
            {isSubscribed || isUserAlreadySubscribed ? (
              <>
                <CheckCircle className="size-5" />
                {dictionary.subscribed}
              </>
            ) : (
              dictionary.subscribe_to_webinar
            )}
          </button>
        )}
      </div>
    </div>
  );
};
