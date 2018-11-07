import { MutationTree } from "vuex";
import { MenuState, Menu } from "@/types/menu";
import { setProperty } from "@/store/persistence";
const mutations: MutationTree<MenuState> = {

  setAsideCollapse(state, asideCollapse: boolean) {
    state.asideCollapse = asideCollapse;
    setProperty("menu.asideCollapse", state.asideCollapse);
  },
  setAside(state, aside: Menu[]) {
    state.aside = aside;
  },
  setHeader(state, header: Menu[]) {
    state.header = header;
  },
};

export default mutations;
