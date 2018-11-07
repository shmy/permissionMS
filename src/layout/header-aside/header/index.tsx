import { CreateElement } from "vue";
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { Menu } from "@/types/menu";

import MenuItem from "@/layout/header-aside/components/menu-item";
const { MODULE_NAME_REGEXP } = window.__SITE_CONFIG.SETTINGS;

@Component({
  name:  "kr_header",
  components: {
    MenuItem,
  },
})
export default class extends Vue {

  @State((state) => state.krAdmin.menu.header) menus!: Menu[];
  get path() {
    const matched = this.$route.path.match(MODULE_NAME_REGEXP);
    if (!matched) { return ""; }
    // 匹配header
    for (let i = 0, j = this.menus.length; i < j; i++) {
      if (new RegExp(`^${matched[0]}`).test(this.menus[i].path as string)) {
        return this.menus[i].path;
      }
    }
    return "";
  }
  render(h: CreateElement) {
    return <el-menu default-active={this.path}
      collapse-transition={true}
      class="el-menu-horizontal"
      mode="horizontal"
      onSelect={this.handleMenuSelect}>
      {this.menus.map(menu => <menu-item menu={menu} />)}
    </el-menu>;
  }
  handleMenuSelect(path: string) {
    this.$nextTick(() => {
      this.$router.push(path);
    });
  }
}


