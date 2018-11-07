import { Module, MutationTree } from "vuex";
import { TransitionState } from "@/types/transition";
import { getProperty, setProperty } from "@/store/persistence";
import defaultSetting from "@/setting";
// import actions from "./actions";
// state
const state: TransitionState = {
  list: defaultSetting.transition.list,
  actived: getProperty("transition.actived"),
};
const mutations: MutationTree<TransitionState> = {
  setActived(state, value: string) {
    state.actived = value;
    setProperty("transition.actived", state.actived);
  },
};
const module: Module<TransitionState, any> = {
  namespaced: true,
  state,
  // actions,
  mutations,
};
export default module;
