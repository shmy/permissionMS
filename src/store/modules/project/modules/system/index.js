import mutations from "./mutations";
const state = {
  list: [],
};
const module = {
  namespaced: true,
  state,
  mutations,
};
export default module;