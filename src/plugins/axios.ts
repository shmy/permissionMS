import axios, { AxiosError } from "axios";
// @ts-ignore
import Cookies from "js-cookie";
// @ts-ignore
import nprogress from "nprogress";
import { db } from "@/libs/util";
import { BeforeResponse, ResponseError } from "@/types/response";
import {
  MessageBox,
} from "element-ui";
const successCode = 200;
const { API_URI } = window.__SITE_CONFIG.SETTINGS;

const instance = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? "/api" : API_URI,
  timeout: 20000,
});
instance.defaults.withCredentials = true;

function showAlert() {
  // @ts-ignore
  MessageBox.alert(this.message, "提示", { type: "error" });
}
function createError(e: Error | string): ResponseError {
  let err: ResponseError;
  if (typeof e === "string") {
    err = createError(new Error(e));
  } else {
    err = {
      name: e.name,
      message: e.message,
      stack: e.stack,
      showAlert,
    };
  }
  return err;
}

export const http = instance;
// 请求拦截
instance.interceptors.request.use(
  async request => {
    nprogress.start();
    try {
      const token = await db.getItem("token");
      if (token) { // 注入token到Cookie
        Cookies.set("token", token);
      }
    } catch (error) {
      // 无法注入token
    }
    return request;
  },
);
// 响应拦截
instance.interceptors.response.use(
  (response): any => {
    nprogress.done();
    const res: BeforeResponse = response.data;
    if (res.code !== successCode) {
      // 业务错误
      return [res.data, createError(res.msg), response];
    }
    // 只将请求结果的data字段返回
    return Promise.resolve([res.data, null, response]);
  },
  (error: AxiosError): any => {
    nprogress.done();
    return Promise.resolve([null, createError(error), error.response]);
  },
);
export default {
  install(Vue: any) {
    Object.defineProperty(Vue.prototype, "$http", {
      get() {
        return instance;
      },
    });
  },
};
