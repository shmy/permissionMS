import { CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import uniqueId from "lodash/uniqueId";
import { Menu } from "@/types/menu";
const { ICON_ENGINE } = window.__SITE_CONFIG.SETTINGS;

@Component({
  name: "menu-item",
})
export default class extends Vue {
  uniqueId: string = uniqueId();
  @Prop({ type: Object, default: () => ({}) })
  menu!: Menu;
  render(h: CreateElement) {
    return (
      <el-menu-item index={this.menu.path || this.uniqueId}>
        <i class={[ICON_ENGINE, this.menu.icon, "menu_icon"]}></i>&nbsp;&nbsp;
        <span slot="title">{this.menu.title}</span>
      </el-menu-item>
    );
  }
}
