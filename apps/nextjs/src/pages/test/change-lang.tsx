import { Button } from "@acme/ui/button";
import { useRouter } from "next/router";

export function ChangeLang() {
  const router = useRouter();
  const changeLocale = (value: string) => {
    router.push("", "", { locale: value }).catch((e) => {
      throw e;
    });
  };
  return (
    <div>
      <Button
        onClick={() => changeLocale(router.locale === "en" ? "pl" : "en")}
      >
        Language: {router.locale}
      </Button>
    </div>
  );
}
