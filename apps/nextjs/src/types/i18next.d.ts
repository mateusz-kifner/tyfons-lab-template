import type { resources } from "../translation";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "base";
    resources: typeof resources.en;
  }
}
