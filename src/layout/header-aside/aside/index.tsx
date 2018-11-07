import { CreateElement } from "vue";
import { Component, Mixins, Watch } from "vue-property-decorator";
import MenuMixin from "@/layout/header-aside/mixin/menu";
import { State } from "vuex-class";
import { Menu } from "@/types/menu";

@Component({
  name:  "kr_aside",
})
export default class extends Mixins(MenuMixin) {
  "$refs": {
    menu: any,
  };
  active: string = "";
  @State((state) => state.krAdmin.menu.asideCollapse) asideCollapse!: boolean;
  @State((state) => state.krAdmin.menu.aside) menus!: Menu[];
  render(h: CreateElement) {
    return <el-menu default-active={this.active}
                    unique-opened={true}
                    collapse-transition={true}
                    class="el-menu-vertical"
                    ref="menu"
                    collapse={this.asideCollapse}
                    onSelect={this.handleMenuSelect}>
            {this.$slots.logo}
            {this.menus.map(menu => this.renderMenu(h, menu))}
          </el-menu>;
  }
  handleMenuSelect(path: string) {
    this.$router.push(path);
  }
  @Watch("$route.matched", { immediate: true })
  onRouteMatched(val: any) {
    this.active = val[val.length - 1].path;
    this.$nextTick(() => {
      // 防止时序问题
      if (this.menus.length > 0) {
        this.$refs.menu.activeIndex = this.active;
      }
    });
  }
}


