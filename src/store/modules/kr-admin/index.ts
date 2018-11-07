import user from "./modules/user";
import menu from "./modules/menu";
import page from "./modules/page";
import theme from "./modules/theme";
import transition from "./modules/transition";

export default {
  namespaced: true,
  modules: {
    user,
    menu,
    page,
    theme,
    transition,
  },
};
