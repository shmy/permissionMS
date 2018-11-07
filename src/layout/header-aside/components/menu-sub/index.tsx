import { CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import uniqueId from "lodash/uniqueId";
import { Menu } from "@/types/menu";
import MenuItem from "@/layout/header-aside/components/menu-item";

const { ICON_ENGINE } = window.__SITE_CONFIG.SETTINGS;

@Component({
  name: "menu-sub",
  components: {
    MenuItem,
  },
})
export default class extends Vue {
  uniqueId: string = uniqueId();
  @Prop({ type: Object, default: () => ({}) })
  menu!: Menu;
  render(h: CreateElement) {
    return (
      <el-submenu popper-class="layout_popper"
                  index={this.menu.path || this.uniqueId}>
        <template slot="title">
          <i class={[ICON_ENGINE, this.menu.icon, "menu_icon"]}></i>&nbsp;&nbsp;
          <span>{this.menu.title}</span>
        </template>
        {this.menu.children && this.menu.children.map(m => {
          if (m.children) {
            return <menu-sub menu={m} />;
          }
          return <menu-item menu={m} />;
        })}
      </el-submenu>
    );
  }

}
