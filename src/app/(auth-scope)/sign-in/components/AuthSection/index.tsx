"use client";
import { Input } from "@/components/common/Input";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, AuthSchemaType } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/instances/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AuthSection = () => {
  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const authMutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: AuthSchemaType) => {
      await api.account.auth.signIn(data.email, data.password);
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao fazer login");
    },
  });

  const onSubmit = (data: AuthSchemaType) => {
    authMutation.mutate(data);
  };

  return (
    <section className="w-full max-w-[372px] mx-auto flex flex-col justify-center pl-5">
      <h2 className="text-lg text-gray-100 font-bold">Boas vindas!</h2>
      <p className="text-gray-200">Faça seu login ou cadastre-se.</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Email"
              icon={<Mail className="size-5" />}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Password"
              icon={<Lock className="size-5" />}
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <span className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-200 hover:bg-purple-200/80 text-white font-medium py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
          disabled={authMutation.isPending}
        >
          {authMutation.isPending ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-300">
          Ainda não possui uma conta?{" "}
          <Link
            href="/sign-up"
            className="text-purple-100 font-bold hover:underline transition-colors duration-200"
          >
            Cadastre-se
          </Link>
        </span>
      </div>
    </section>
  );
};
