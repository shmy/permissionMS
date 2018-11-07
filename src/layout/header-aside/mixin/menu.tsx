import { CreateElement } from "vue";
import { Component,  Vue } from "vue-property-decorator";
import { Menu } from "@/types/menu";
import MenuSub from "@/layout/header-aside/components/menu-sub";
import MenuItem from "@/layout/header-aside/components/menu-item";
@Component({
  components: {
    MenuSub,
    MenuItem,
  },
})
export default class extends Vue {
  renderMenu(h: CreateElement, menu: Menu) {
    return menu.children ? <menu-sub menu={menu} /> : <menu-item menu={menu} />;
  }
}
