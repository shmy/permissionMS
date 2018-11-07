import { ActionTree } from "vuex";
import { MenuState } from "@/types/menu";

const actions: ActionTree<MenuState, any> = {
  /**
   * 设置侧边栏
   * @param param0 vuex
   */
  asideCollapseSet({ commit }, collapse: boolean) {
    commit("setAsideCollapse", collapse);
  },
  /**
   * 切换侧边栏
   * @param param0 vuex
   */
  asideCollapseToggle({ state, commit }) {
    commit("setAsideCollapse", !state.asideCollapse);
  },
};

export default actions;
