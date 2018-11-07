import Vue from "vue";
// @ts-ignore
import App from "@/App.vue";
import ElementUI from "@/plugins/element-ui";
// @ts-ignore
import D2Crud from "@d2-projects/d2-crud";
import Axios from "@/plugins/axios";
import "@/assets/style/index.scss";
import "@/assets/font-awesome-4.7.0/scss/font-awesome.scss";
import { initState } from "@/store/persistence";
import { printTheCopyright, getModule, getDepthPath  } from "@/libs/util";
import { generateDynamicMenu, generateDynamicRouting } from "@/router/dynamic-routes";
import { getBaseInfo } from "@/libs/init";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(D2Crud);
Vue.use(Axios);

printTheCopyright();

// 启动程序
const bootstrap = async () => {
  const baseInfo: any = await getBaseInfo();
  // @ts-ignore
  const store = require("@/store").default;
  const generateRouting = require("@/router").default;
  let allMenus = [];
  let ids = [];
  if (baseInfo && baseInfo.tree) {
    // @ts-ignore
    ids = baseInfo.tree.map(item => item.id);
    allMenus = generateDynamicMenu(ids);
  }
  const frameInRoutes = generateDynamicRouting(ids);
  const router = generateRouting(frameInRoutes);
  const menuAside = allMenus.map(item => ({
    path: getDepthPath(item),
    title: item.title,
    icon: item.icon,
    children: item.children || [],
  }));
  // 处理一级header
  // const menuHeader = menuAside.map(item => ({
  //   path: item.path,
  //   title: item.title,
  //   icon: item.icon,
  // }));
  new Vue({
    store,
    router,
    render: (h) => h(App),
    created() {
      this.$store.dispatch("krAdmin/page/init", frameInRoutes[0].children);
      // this.$store.commit("krAdmin/menu/setHeader", menuHeader);
      this.$store.commit("krAdmin/menu/setAside", menuAside);
      this.$store.commit("krAdmin/theme/apply");
      if (baseInfo) {
        this.$store.commit("krAdmin/user/setUser", baseInfo.user);
        this.$store.commit("project/system/setList", baseInfo.system);
      }
    },
    methods: {
      /**
       * 自动匹配左侧栏目
       */
      matchSideItem(path: string) {
        if (!path) {
          path = this.$route.path;
        }
        path = getModule(path);
        const side = menuAside.filter(menu => getModule(menu.path) === path);
        if (side.length !== 0) {
          this.$store.commit("krAdmin/menu/setAside", side.length > 0 ? side[0].children : []);
        }
      },
    },
    // watch: {
    //   // 监听路由 控制侧边栏显示
    //   "$route.matched"(val) {
    //     const path = val[val.length - 1].path;
    //     this.matchSideItem(path);
    //   },
    // },
  }).$mount("#app");
};
const pretreatment = [initState()];
// 非生产环境加载mock
// if (process.env.NODE_ENV !== "production") {
//   // @ts-ignore
//   pretreatment.push(import("@/mock"));
// }
// 等待队列全部完成
Promise.all(pretreatment).then(bootstrap).catch((error) => {
  (document.querySelector("#app") as HTMLDivElement).innerHTML = `
    <h3 style="text-align: center; margin-top: 100px">加载系统失败:(</h3>
    <h3 style="text-align: center; color: orange">出错地址：${window.location.pathname}</h3>
    <h3 style="text-align: center; color: red">错误信息：${error.message || "未知"}</h3>
    <p style="text-align: center;">您可以尝试 <a href="javascript:(void);" onclick="window.location.reload();">重新加载</a></p>
    `;
});
