import { MutationTree } from "vuex";
import { UserState, User } from "@/types/user";
const mutations: MutationTree<UserState> = {
  setUser(state, user: User) {
    state.user = user;
  },
};

export default mutations;
