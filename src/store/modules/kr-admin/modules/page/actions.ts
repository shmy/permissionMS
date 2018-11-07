import Vue from "vue";
import { ActionTree } from "vuex";
import { PageState, Page } from "@/types/page";
import cloneDeep from "lodash/cloneDeep";
import { randomString, stringToHexCharCode } from "@/libs/util";
import find from "lodash/find";
import findIndex from "lodash/findIndex";

function randomStringHex(): string {
  return stringToHexCharCode(randomString(6));
}
function checkInThePond(page: Page): boolean {
  return page.meta.pool;
}

const actions: ActionTree<PageState, any> = {
  init({ state, commit }, routes: any) {
    // 初始化pool池
    const pool: Page[] = [];
    state.pool.forEach(poolItem => {
      const index = findIndex(routes, (route: any) => route.name === poolItem.name);
      if (index !== -1) {
        // 加入pool池
        pool.push(poolItem);
      }
    });
    // 设置
    commit("setPool", pool);
  },
  /**
   * 加入栈
   * @param param0 vuex
   */
  putPage({ commit }, page: Page) {
    // tslint:disable-next-line:no-unused-expression
    checkInThePond(page) && commit("putPool", page);
  },
  /**
   * 打开新页面
   * @param param0 vuex
   */
  open({ state, dispatch, commit }, page: Page) {
    // 非tabs框架内不处理
    if (!checkInThePond(page)) {
      return;
    }
    // 判断此页面是否已经打开 并且记录位置
    let pageOpendIndex = 0;
    const pageOpend = find(state.pool, (p, index) => {
      const same = p.name === page.name;
      pageOpendIndex = same ? index : pageOpendIndex;
      return same;
    });
    if (pageOpend) {
      commit("updatePage", {
        index: pageOpendIndex,
        params: page.params,
        query: page.query,
        meta: page.meta,
      });
    } else {
      dispatch("putPage", page);
    }
    dispatch("setCurrentName", page.name);
  },
  /**
   * 设置当前选中的name
   * @param param0 vuex
   */
  setCurrentName({ commit }, current: string) {
    commit("setCurrent", current);
  },
  /**
   * 关闭一个tab
   */
  close({ state, commit }, { tagName, vm }: { tagName: string, vm: Vue }) {
    if (state.pool.length === 1) {
      return;
    }
    const index = findIndex(state.pool, t => t.name === tagName);
    if (index !== -1) {
      commit("delPool", { index });
      // 打开剩下的 删除的时候有问题 好像是跳过了第0个？
      let page = state.pool[index];
      if (!page) {
        page = state.pool[index - 1];
      }
      if (page) {
        vm.$router.push(page);
      }
    }
  },
  /**
   * 刷新一个页面
   * @param param0 vuex
   * @param vm vue
   */
  refresh({ state }, { tagName, vm }: { tagName: string, vm: Vue }) {
    if (!tagName) {
      tagName = state.current;
    }
    let page = find(state.pool, t => t.name === tagName);
    if (page) {
      page = cloneDeep(page);
      // 加上随机参数刷新
      page.query._ = randomStringHex();
      vm.$router.replace(page);
    }
  },
  /**
   * 关闭左边
   * @param param0 vuex
   * @param vm vue
   */
  closeLeft({ state, commit }, { tagName, vm }: { tagName: string, vm: Vue }) {
    const len = state.pool.length;
    if (len === 1) {
      return;
    }
    if (!tagName) {
      tagName = state.current;
    }
    const index = findIndex(state.pool, t => t.name === tagName);
    if (index === -1) {
      return;
    }
    vm.$router.push(state.pool[index]);
    let pool = cloneDeep(state.pool);
    pool = pool.splice(index, len - index);
    commit("setPool", pool);
  },
  /**
   * 关闭右边
   * @param param0 vuex
   * @param vm vue
   */
  closeRight({ state, commit }, { tagName, vm }: { tagName: string, vm: Vue }) {
    const len = state.pool.length;
    if (len === 1) {
      return;
    }
    if (!tagName) {
      tagName = state.current;
    }
    const index = findIndex(state.pool, t => t.name === tagName);
    if (index === -1) {
      return;
    }
    vm.$router.push(state.pool[index]);
    // 如果是第一项 直接留下第一项
    if (index === 0) {
      commit("setPool", [state.pool[0]]);
      return;
    }
    // 最后一项没有右边
    if (index === len - 1) {
      return;
    }
    // 除掉后面的tabs
    commit("delPool", {
      index: index + 1,
      count: len - index - 1,
    });
  },
  /**
   * 关闭其他
   * @param param0 vuex
   * @param vm vue
   */
  closeOther({ state, commit }, { tagName, vm }: { tagName: string, vm: Vue }) {
    const len = state.pool.length;
    if (len === 1) {
      return;
    }
    if (!tagName) {
      tagName = state.current;
    }
    const index = findIndex(state.pool, t => t.name === tagName);
    if (index === -1) {
      return;
    }
    const page = state.pool[index];
    vm.$router.push(page);
    // 除掉其他的tabs
    const pool = [page];
    commit("setPool", pool);
  },
};

export default actions;
