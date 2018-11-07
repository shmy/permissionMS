import { SiteConfig } from "@/types/global";

declare global {
  interface Window {
    __SITE_CONFIG: SiteConfig;
  }
}
