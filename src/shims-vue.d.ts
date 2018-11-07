// declare module "*.vue" {
//  import Vue from "vue";
//   export default Vue;
// }

import Vue from 'vue'
import { AxiosRequestConfig } from "axios";
import { AfterResponse } from "@/types/response";

declare module 'vue/types/vue' {
  interface Vue {
    $http: {
      request<T = any>(config: AxiosRequestConfig): Promise<AfterResponse>;
      get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AfterResponse>;
      delete(url: string, config?: AxiosRequestConfig): Promise<AfterResponse>;
      head(url: string, config?: AxiosRequestConfig): Promise<AfterResponse>;
      post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse>;
      put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse>;
      patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse>;
    }
  }
}