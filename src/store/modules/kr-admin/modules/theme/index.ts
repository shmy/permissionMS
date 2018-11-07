import { Module, MutationTree } from "vuex";
import { ThemeState } from "@/types/theme";
import { getProperty, setProperty } from "@/store/persistence";
import defaultSetting from "@/setting";
// import actions from "./actions";
function applyTheme(name: string) {
  window.document.body.dataset.theme = name;
}
// state
const state: ThemeState = {
  list: defaultSetting.theme.list,
  actived: getProperty("theme.actived"),
};
const mutations: MutationTree<ThemeState> = {
  setActived(state, value: string) {
    state.actived = value;
    setProperty("theme.actived", state.actived);
    applyTheme(state.actived);
  },
  apply(state) {
    applyTheme(state.actived);
  },
};
const module: Module<ThemeState, any> = {
  namespaced: true,
  state,
  // actions,
  mutations,
};
export default module;
