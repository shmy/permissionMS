import { maps, routes } from "@/menu/map";
import { recursion } from "@/libs/util";
import layoutHeaderAside from "@/layout/header-aside/layout.vue";
// import err from "@/pages/error-404/index.vue";

// 根据ids生成路由结构
export const generateDynamicRouting = (allowIds: number[]) => {
  let frameInChildren: any = [];
  if (allowIds.length > 0) {
    const data = routes.filter(item => {
      // tslint:disable-next-line:no-bitwise
      return ~allowIds.indexOf(item.id);
    });
    frameInChildren = data.map(item => {
      if (item.path) {
        const generalName = item.path.replace(/\//g, "_").replace(/^_/, "");
        item.name = generalName;
        // @ts-ignore
        item.component = item.component(generalName);
      }
      return item;
    });
  }
  return [
    {
      path: "/",
      redirect: {
        name: frameInChildren.length > 0 ? frameInChildren[0].name : "welcome",
      },
      component: layoutHeaderAside,
      children: frameInChildren,
    },
  ];
};

// 根据ids生成菜单结构
export const generateDynamicMenu = (allowIds: number[]) => {
  let data: any = [];
  if (allowIds.length > 0) {
    data = maps.filter(item => {
      // tslint:disable-next-line:no-bitwise
      return ~allowIds.indexOf(item.id);
    });
  }
  return recursion(data, "id", "pid", null);
};
