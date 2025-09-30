import { cn } from "@/lib/utils";
import { TagProps } from "./types";

export const Tag = ({ children, active, ...props }: TagProps) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-none text-purple-100 border border-purple-100",
        "px-4 py-1 rounded-full transition-colors duration-200 cursor-pointer",
        "hover:text-gray-100 hover:bg-purple-200",
        active && "text-gray-100 bg-purple-200 border border-purple-200",
        props.className
      )}
    >
      {children}
    </button>
  );
};
