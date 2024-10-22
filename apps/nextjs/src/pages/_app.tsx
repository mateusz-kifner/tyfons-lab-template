import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { TooltipProvider } from "@acme/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/sonner";
import useColorScheme from "@acme/ui/useColorScheme";
import "../i18n";
import i18n from "../i18n";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  useColorScheme();
  const router = useRouter();
  if (router.locale !== undefined && router.locale !== i18n.language) {
    i18n.changeLanguage(router.locale); // FIXME: this causes render mismatch error only on language change
  }

  return (
    <div className="h-min-screen bg-popover text-foreground">
      <TooltipProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <Component {...pageProps} />
          </TRPCReactProvider>
          <div className="fixed right-4 bottom-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </div>
  );
}
