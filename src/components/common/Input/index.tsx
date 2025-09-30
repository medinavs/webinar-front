import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  className?: string;
};

export const Input = ({ icon, className, ...props }: InputProps) => {
  return (
    <div
      className={cn(
        "bg-gray-800 border border-current flex items-center w-full rounded gap-5 pr-5 text-gray-500 transition-colors duration-200 focus-within:text-green-200",
        className
      )}
    >
      <input
        className="h-12 flex-1 pl-5 bg-transparent border-none text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none"
        {...props}
      />
      {icon}
    </div>
  );
};
