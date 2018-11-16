import localforage from "localforage";
import Dayjs from "dayjs";
const {
  NAME,
  VERSION,
  BUILD_AT,
  SUPPORT_NAME,
  SUPPORT_URL,
  SETTINGS: {
    MODULE_NAME_REGEXP
  }
} = window.__SITE_CONFIG;
/**
 * 更改document.title
 * @param title 名称
 */
export const changeDocumentTitle = (title: string) => {
  window.document.title = `${title}|${NAME}`;
};
/**
 * 打印版权
 */
export const printTheCopyright = () => {
  capsuleLog(NAME, VERSION, BUILD_AT);
  console.log(SUPPORT_NAME, SUPPORT_URL);
};
/**
 * 三段打印
 * @param arg 展开文本数组
 */
export const capsuleLog = (...arg: string[]) => {
  const style = (color: string) => `background:#${color};padding:1px;border-radius: 3px;color:#fff;`;
  console.log(
    `%c ${arg[0]} %c ${arg[1]} %c ${arg[2]} %c`,
    style("29384b"),
    style("3488ff") + "margin-left:2px",
    style("ef4134") + "margin-left:2px",
    "background:transparent",
  );
};
/**
 * 递归
 * @param data object array
 * @param primaryKey
 * @param key
 * @param value
 */
export const recursion = (data: any[],
                          primaryKey: string,
                          key: string,
                          value: any,
                          levelKey: string = "level",
                          level: number = 0) => {
  const result = [];
  let temp;
  for (const item of data) {
    if (item[key] === value) {
      temp = recursion(data, primaryKey, key, item[primaryKey], levelKey, level + 1);
      if (temp.length) {
        item.children = temp;
      }
      result.push(item);
    }
  }
  return result.map(item => ({
    ...item,
    [levelKey]: level,
  }));
};
/**
 * 根据$route.path获取模块名称
 * @param path path
 */
export const getModule = (path: string): string => {
  if (!path) { return ""; }
  const matched = path.match(MODULE_NAME_REGEXP);
  if (!matched) { return ""; }
  return matched[0];
};
/**
 * 根据获取默认path
 * @param o Menu
 */
export const getDepthPath = (o: any): string => {
  if (o.path) { return o.path; }
  if (o.children && o.children.length > 0) {
    if (!o.children[0].path) { return getDepthPath(o.children[0]); }
    return o.children[0].path;
  }
  return "/error-forbidden";
};
/**
 * 随机指定长度字符串
 * @param len 长度
 */
export const randomString = (len = 16): string => {
  let str = Math.random().toString(36).substr(2);
  while (str.length < len) {
    str += Math.random().toString(36).substr(2);
  }
  return str.substring(0, len);
};
/**
 * 字符串转换为16进制
 * @param str 字符串
 */
export const stringToHexCharCode = (str: string): string => {
  if (str === "") {
    return "";
  }
  const hexCharCode = [];
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
};
/**
 * 单例 localforage
 */
export const db = localforage;

export const formatTimeStamp = (timeStamp: string): string => {
  if (!timeStamp) {
    return "未知时间";
  }
  return Dayjs(timeStamp).format("YYYY-MM-DD HH:mm");
};
