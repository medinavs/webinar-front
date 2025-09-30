import { ComponentProps, ReactNode } from "react";

export type TagProps = ComponentProps<'button'> & {
    children: ReactNode;
    active?: boolean;
};