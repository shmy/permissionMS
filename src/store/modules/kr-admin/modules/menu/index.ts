import { Module } from "vuex";
import { MenuState, Menu } from "@/types/menu";
import actions from "./actions";
import mutations from "./mutations";
import { getProperty } from "@/store/persistence";
const aside: Menu[] = [
];
// state
const state: MenuState = {
  header: aside,
  aside,
  asideCollapse: getProperty("menu.asideCollapse", "false"),
};
const module: Module<MenuState, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default module;
