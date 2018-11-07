<template>
  <el-dialog title="个性设置"
             :visible.sync="visible">
    <h2>选择主题</h2>
    <div style="text-align: center">
      <el-radio-group v-model="scopedThemeActived"
                      size="small">
        <el-radio-button v-for="item of themeList"
                        :key="item.name"
                        :label="item.name">
          {{ item.title }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <h2>选择过渡</h2>
    <div style="text-align: center">
      <el-radio-group v-model="scopedTransitionActived"
                      size="small">
        <el-radio-button v-for="item of transitionList"
                        :key="item.name"
                        :label="item.name">
          {{ item.title }}
        </el-radio-button>
      </el-radio-group>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Theme } from "@/types/theme";
import { Transition } from "@/types/transition";

@Component({
  name: "setting",
})
export default class extends Vue {
  visible = false;
  @State(state => state.krAdmin.theme.list)
  themeList!: Theme[];
  @State(state => state.krAdmin.transition.list)
  transitionList!: Transition[];
  @State(state => state.krAdmin.theme.actived)
  themeActived!: string;
  @State(state => state.krAdmin.transition.actived)
  transitionActived!: string;
  @Mutation("krAdmin/theme/setActived")
  setThemeActived: any;
  @Mutation("krAdmin/transition/setActived")
  setTransitionActived: any;
  get scopedThemeActived(): string {
    return this.themeActived;
  }
  set scopedThemeActived(value: string) {
    this.setThemeActived(value);
  }
  get scopedTransitionActived(): string {
    return this.transitionActived;
  }
  set scopedTransitionActived(value: string) {
    this.setTransitionActived(value);
  }
  open() {
    this.visible = true;
  }
}
</script>