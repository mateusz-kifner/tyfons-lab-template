import type { AppProps } from "next/app";
import "@/app/globals.css";
import { TooltipProvider } from "@acme/ui/tooltip";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </div>
  );
}
