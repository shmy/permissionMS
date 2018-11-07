export default {
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false,
  },
  // 过渡效果列表及名称
  transition: {
    list: [
      {
        title: "无",
        name: "",
      },
      {
        title: "温柔",
        name: "fade-transverse",
      },
      {
        title: "激烈",
        name: "fade-scale",
      },
      {
        title: "优雅",
        name: "slide-left",
      },
      {
        title: "粗犷",
        name: "rotate-left",
      },
    ],
    // 默认激活的过渡效果name
    actived: "fade-transverse",
  },
  // 主题列表及名称
  theme: {
    list: [
      {
        title: "蓝色",
        name: "blue",
      },
      {
        title: "暗黑",
        name: "dark",
      },
    ],
    // 默认激活的主题name
    actived: "blue",
  },
};

// 侧边栏和顶部栏的icon引擎
// 渲染为:
// class="iconfont icon-home"
// class="fa fa-home"
// export const ICON_ENGINE = "fa";
// vue-router模式 hash/history
// export const ROUTER_MODE = "hash";
// 版本号 用于控制存储的key 注意： 更改了框架默认的持久化数据请修改版本号
// export const VERSION = "0.0.1";
// 模块正则 比如 /form/stdin 使用/(^\/[a-z0-9]+)/ 可以取得/form
// export const MODULE_NAME_REGEXP = /(^\/[a-z0-9]+\/)/;
// 生产环境接口地址
// 支持相对路径 绝对路径
// export const API_URI = "/api";
