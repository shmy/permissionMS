import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import krAdmin from "./modules/kr-admin";
// @ts-ignore
import project from "./modules/project";
Vue.use(Vuex);

const store: StoreOptions<any> = {
  strict: process.env.NODE_ENV !== "production",
  modules: {
    krAdmin,
    project,
  },
};
export default new Vuex.Store<any>(store);
