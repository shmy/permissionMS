import Vue from "vue";
import Router from "vue-router";
import { changeDocumentTitle } from "@/libs/util";
import { db } from "@/libs/util";

Vue.use(Router);

const { BASE_URL, ROUTER_MODE } = window.__SITE_CONFIG.SETTINGS;

const load = (name: string, ext: string = "vue") => () => import(`@/pages/${name}.${ext}`);

export default (dynamicRoutes: any) => {
  // 无权限页面
  if (dynamicRoutes[0].children.length === 0) {
    dynamicRoutes[0].children.push({
      name: "welcome",
      path: "/welcome",
      component: load("welcome/index"),
      meta: {
        title: "欢迎页面",
      },
    });
  }
  const router = new Router({
    mode: ROUTER_MODE,
    base: BASE_URL,
    routes: [
      ...dynamicRoutes,
      {
        name: "login",
        path: "/login",
        component: load("login/index"),
        meta: {
          title: "登录",
        },
      },
      {
        name: "forbidden",
        path: "*",
        component: load("error-403/index"),
        meta: {
          title: "无权访问",
        },
      },
      {
        name: "not-found",
        path: "*",
        component: load("error-404/index"),
        meta: {
          title: "页面不存在",
        },
      },
    ],
  });
  router.beforeEach(async (to, from, next) => {
    // 验证当前路由所有的匹配中是否需要有登陆验证的
    if (to.matched.some(r => r.meta.requiresAuth)) {
      // 这里暂时将cookie里是否存有token作为验证是否登陆的条件
      // 请根据自身业务需要修改
      const token = await db.getItem("token");
      if (token && token !== "undefined") {
        next();
      } else {
        // 没有登陆的时候跳转到登陆界面
        next({
          name: "login",
          query: {
            redirect: to.fullPath,
          },
        });
      }
    } else {
      // 不需要身份校验 直接通过
      next();
    }
  });
  router.afterEach(to => {
    // 需要的信息
    const app = router.app;
    const { meta, name, params, query } = to;
    // 多页控制 打开新的页面
    app.$store.dispatch("krAdmin/page/open", { name, params, query, meta });
    // 更改标题
    changeDocumentTitle(meta.title || "未命名");
  });
  return router;
};

