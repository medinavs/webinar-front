import { Waypoints } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

export const LogoSection: FC = () => {
  return (
    <section className="w-full h-full relative flex items-center justify-center rounded-[10px] overflow-hidden">
      <Image
        src="/images/bg-login.webp"
        alt="Background"
        width={1920}
        height={1080}
        sizes="100vw"
        priority
        className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-20 pointer-events-none"
      />
      <div className="relative flex items-center gap-2">
        <Waypoints className="size-15 text-white" />
        <h2 className="text-4xl font-bold mb-0.5 bg-gradient-to-r from-green-100 to-purple-100 text-transparent bg-clip-text">
          WebinarConnect
        </h2>
      </div>
    </section>
  );
};
