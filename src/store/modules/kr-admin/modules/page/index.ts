import { Module } from "vuex";
import { PageState, Page } from "@/types/page";
import actions from "./actions";
import mutations from "./mutations";
import { getProperty } from "@/store/persistence";

const pool: Page[] = getProperty("page.pool", []);
// state
const state: PageState = {
  pool,
  keepAlive: [],
  current: getProperty("page.current", "index"),
};
const module: Module<PageState, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default module;
