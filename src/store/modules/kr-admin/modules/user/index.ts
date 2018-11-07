import { Module } from "vuex";
import { UserState } from "@/types/user";
import mutations from "./mutations";

// state
const state: UserState = {
  user: {
    id: -1,
    name: "",
    login: "",
    phone: "",
  }
};
const module: Module<UserState, any> = {
  namespaced: true,
  state,
  mutations,
};
export default module;
