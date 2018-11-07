export interface SiteConfig {
  NAME: string;
  VERSION: string;
  BUILD_AT: string;
  SUPPORT_NAME: string;
  SUPPORT_URL: string;
  SETTINGS: {
    BASE_URL: string;
    ICON_ENGINE: string;
    MODULE_NAME_REGEXP: RegExp;
    ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
    API_URI: string
  };
}
