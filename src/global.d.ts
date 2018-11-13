import { SiteConfig } from "@/types/global";
import VueRouter from "vue-router";

declare global {
  interface Window {
    __SITE_CONFIG: SiteConfig;
  }
}
