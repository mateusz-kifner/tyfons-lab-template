import type { AppProps } from "next/app";
import "@/app/globals.css";
import { TooltipProvider } from "@acme/ui/tooltip";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen bg-red-950 text-stone-100">
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </div>
  );
}
