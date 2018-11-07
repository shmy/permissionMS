import { MutationTree } from "vuex";
import { PageState, Page } from "@/types/page";
import { setProperty } from "@/store/persistence";
import remove from "lodash/remove";
import Vue from "vue";

const mutations: MutationTree<PageState> = {
  /**
   * 更新一个页面
   * @param state state
   * @param param1 index, payload
   */
  updatePage(state, { index, params, query, meta }) {
    const page = state.pool[index];
    page.params = params;
    page.query = query;
    page.meta = meta;
    state.pool.splice(index, 1, page);
  },
  /**
   * 设置一个页面
   * @param state state
   * @param pool pool
   */
  setPool(state, pool: Page[]) {
    state.pool = pool;
    // 设置缓存
    state.keepAlive = state.pool.filter(item => item.meta.cache).map(item => item.name);
    setProperty("page.pool", state.pool);
  },
  /**
   * 加入一个页面
   * @param state state
   * @param page page
   */
  putPool(state, page: Page) {
    state.pool.push(page);
    const keep = [...state.keepAlive];
    if (page.meta.cache) {
      keep.push(page.name);
      state.keepAlive = Array.from(new Set(keep));
    }
    setProperty("page.pool", state.pool);
  },
  /**
   * 删除若干页面
   * @param state vuex
   * @param param1 index, count
   */
  delPool(state, { index, count = 1 }: { index: number, count: number }) {
    const pool = [...state.pool];
    const poolItems = pool.splice(index, count);
    const keep = [...state.keepAlive];
    const names = poolItems.map(item => item.name);
    // 删除对应的缓存
    remove(keep, item => names.indexOf(item) !== -1);
    state.pool = pool;
    state.keepAlive = keep;
    setProperty("page.pool", state.pool);
  },
  /**
   * 设置当前选中页面
   * @param state state
   * @param name name
   */
  setCurrent(state, name: string) {
    state.current = name;
    setProperty("page.current", state.current);
  },
};

export default mutations;
