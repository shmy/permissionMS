import { http } from "@/plugins/axios";
import { db } from "@/libs/util";
// 初始化状态
export const getBaseInfo = () => {
  return new Promise(async (resolve, reject) => {
    const token = await db.getItem("token");
    if (!token) {
      return resolve();
    }

    // @ts-ignore
    const [userInfo, treeInfo, systemInfo] = await Promise.all([
      // 获取用户信息
      http.get("/user/getOneself"),
      // 获取菜单信息
      http.get("/auth/tree"),
      // 获取系统信息
      http.get("/system/query")
    ]);
    // @ts-ignore
    const [userInfoRep, userInfoErr] = userInfo;
    // @ts-ignore
    const [treeInfoRep, treeInfoErr] = treeInfo;
    // @ts-ignore
    const [systemInfoRep, systemInfoErr] = systemInfo;
    const err = userInfoErr || treeInfoErr || systemInfoErr;
    if (err) {
      return reject(err);
    }
    resolve({
      user: userInfoRep,
      tree: treeInfoRep,
      system: systemInfoRep,
    });
  });
};
