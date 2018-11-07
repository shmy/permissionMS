const PERMISSION_PATH = "/permissions/";
const SYSTEM_PATH = "/system/";
const USER_PATH = "/users/";
export interface RouteMap {
  id: number;
  pid: number | null;
  title: string;
  name?: string;
  path?: string;
  icon?: string;
  cache?: boolean; // 是否缓存， 默认true
  children?: RouteMap[];
}
const MAPS: RouteMap[] = [
  { id: 1, title: "权限", icon: "fa-home", pid: null },
  { id: 2, title: "权限管理", path: `${PERMISSION_PATH}management`, icon: "fa-home", pid: 1 },
  { id: 11, title: "系统", icon: "fa-home", pid: null },
  { id: 12, title: "系统管理", path: `${SYSTEM_PATH}management`, cache: true, icon: "fa-home", pid: 11 },
  { id: 21, title: "用户", icon: "fa-home", pid: null },
  { id: 22, title: "用户管理", path: `${USER_PATH}management`, icon: "fa-home", pid: 21 },
];

const MAP_WITH_COMPONENT = MAPS.filter(item => !!item.path).map(item => ({
  id: item.id,
  name: "",
  // pid: item.pid,
  path: item.path,
  meta: {
    pool: true,
    cache: !(item.cache === false),
    requiresAuth: true,
    title: item.title,
  },
  // 预处理 自动给组件添加和对应路由相同的name
  component: (name: string) => () => import(`@/pages${item.path}`).then((component) => {
    if (typeof component.default === "object") {
      // 正常标准写法, 未使用ts
      component.default.name = name;
    } else {
      // ts 写法
      component.default.options.name = name;
    }
    return component;
  }),
}));

export const routes = MAP_WITH_COMPONENT;
export const maps = MAPS;
