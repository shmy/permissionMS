import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { DropdownType } from "@/types/enums";

@Component
export default class extends Vue {
  @Action("krAdmin/page/refresh")
  handlePageRefresh!: any;
  @Action("krAdmin/page/closeLeft")
  handlePageCloseLeft!: any;
  @Action("krAdmin/page/closeRight")
  handlePageCloseRight!: any;
  @Action("krAdmin/page/closeOther")
  handlePageCloseOther!: any;
  @Action("krAdmin/page/closeAll")
  handlePageCloseAll!: any;
  handlePageCommandChooseed(command: DropdownType, tagName: string) {
    // console.log(command, DropdownType.closeOther);
    switch (command) {
      case DropdownType.refresh:
        this.handlePageRefresh({ tagName, vm: this });
        break;
      case DropdownType.closeLeft:
        this.handlePageCloseLeft({ tagName, vm: this });
        break;
      case DropdownType.closeRight:
        this.handlePageCloseRight({ tagName, vm: this });
        break;
      case DropdownType.closeOther:
        this.handlePageCloseOther({ tagName, vm: this });
        break;
      case DropdownType.closeAll:
        this.handlePageCloseAll({ tagName, vm: this });
        break;
      default:
        break;
    }
  }
}
