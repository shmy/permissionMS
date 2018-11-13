<template>
  <div class="tool-bar"
       flex="dir:left main:center cross:center">
    <el-tooltip class="item"
                effect="dark"
                :content="(isFullScreen ? '退出' : '进入') + '全屏'"
                placement="bottom">
      <div class="tool-bar-item"
           @click="toggleFullScreen()">
        <i class="fa"
           :class="'fa-' + (isFullScreen ? 'compress' : 'arrows-alt')"></i>
      </div>
    </el-tooltip>

    <el-dropdown dropdown="bottom"
                 @command="command => onChooseed(command)">
      <div class="profile_dropdown"
           flex="dir:left main:center">
        <img class="avatar"
             src="/images/theme/default/logo/icon_only.png"
             alt="">
        <span class="username">{{ user.name.toUpperCase() }}</span>
        <i class="arrow_down el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="profileOptions.profile">修改资料</el-dropdown-item>
        <el-dropdown-item :command="profileOptions.personality">个性设置</el-dropdown-item>
        <el-dropdown-item :command="profileOptions.clearCache">清除缓存</el-dropdown-item>
        <el-dropdown-item :command="profileOptions.logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { State } from "vuex-class";
import { ProfileOptions } from "@/types/enums";
// @ts-ignore
import _screenfull from "screenfull";
const screenfull = _screenfull as any;

@Component({
  name: "tool-bar",
})
export default class extends Vue {
  isFullScreen = false;
  profileOptions = {
    profile: ProfileOptions.profile,
    personality: ProfileOptions.personality,
    clearCache: ProfileOptions.clearCache,
    logOut: ProfileOptions.logOut,
  };
  @State(state => state.krAdmin.user.user) user: any;
  @Emit()
  onChooseed(command: ProfileOptions): ProfileOptions {
    return command;
  }
  toggleFullScreen() {
    screenfull.isFullscreen ? screenfull.exit() : screenfull.request();
  }
  created() {
    if (screenfull.enabled) {
      screenfull.on("change", () => {
        this.isFullScreen = screenfull.isFullscreen;
      });
    }
  }
}
</script>


