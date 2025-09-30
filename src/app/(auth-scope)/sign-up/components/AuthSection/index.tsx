"use client";
import { Input } from "@/components/common/Input";
import { Lock, Mail, User } from "lucide-react";
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
      name: "",
    },
  });

  const router = useRouter();

  const authMutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: AuthSchemaType) => {
      await api.account.auth.signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      toast.error("Erro ao fazer cadastro");
    },
  });

  const onSubmit = (data: AuthSchemaType) => {
    authMutation.mutate(data);
  };

  return (
    <section className="w-full max-w-[372px] mx-auto flex flex-col justify-center pl-5">
      <h2 className="text-lg text-gray-100 font-bold">Crie sua conta</h2>
      <p className="text-gray-200">Preencha os campos para se cadastrar.</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Nome"
              icon={<User className="size-5" />}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <span className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>
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
              placeholder="Senha"
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
          {authMutation.isPending ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-300">
          Já possui uma conta?{" "}
          <Link
            href="/sign-in"
            className="text-purple-100 font-bold hover:underline transition-colors duration-200"
          >
            Faça login
          </Link>
        </span>
      </div>
    </section>
  );
};
