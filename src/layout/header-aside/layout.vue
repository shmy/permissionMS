<template>
  <!-- 容器 -->
  <div class="layout_container"
       flex="dir:left">
    <krSetting ref="setting" />
    <profileEdit @edit="handleProfileSubmit($event)"
                 ref="profile" />
    <profilePassword @edit="handleProfilePasswordSubmit($event)"
                     ref="profilePassword" />
    <!-- 左侧 -->
    <kr-aside class="layout_aside"
              ref="aside">
      <div slot="logo"
           class="logo">
        <img :class="asideCollapse ? 'logo_icon_only' : 'logo_all'"
             :src="logoSrc"
             alt="">
      </div>
    </kr-aside>
    <!-- 右侧 -->
    <div class="layout_content"
         flex-box="1"
         flex="dir:top">
      <!-- 头部  -->
      <div class="layout_content_head"
           flex="dir:left">
        <div @click="handleAsideCollapseToggle()"
             class="toggle_aside_btn"
             :title="(asideCollapse ? '展开' : '收起') + '菜单'">
          <i class="fa fa-bars"
             :class="asideCollapse && 'collapse'"></i>
        </div>
        <div flex-box="1"
             class="header_item_group">
          <kr-header class="layout_header" />
        </div>
        <!-- 系统选择 -->
        <!-- <el-select size="small" :value="systemListActived">
          <el-option v-for="item of systemList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select> -->
        <customToolbar />
        <krToolBar @on-chooseed="handleProfileChooseed($event)" />
      </div>

      <!-- body -->
      <div class="layout_content_body"
           flex-box="1"
           flex="dir:top">
        <!-- tabs -->
        <div class="tabs_wrapper"
             flex="dir:left cross:bottom">
          <KrTabs flex-box="1" />
          <KrDropdown @on-chooseed="handlePageCommandChooseed($event)" />
        </div>
        <!-- 路由 -->
        <div flex-box="1"
             class="router_view_body">
          <transition :name="activedTransitionName">
            <keep-alive :include="keepAlive">
              <router-view :key="$route.fullPath"
                           class="router_view" />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import Cookies from "js-cookie";
import { Component, Vue, Mixins } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { db } from "@/libs/util";
import { DropdownType, ProfileOptions } from "@/types/enums";
import PageMixin from "@/layout/header-aside/mixin/page";
import { KEY } from "@/store/persistence";
import KrAside from "@/layout/header-aside/aside";
import KrHeader from "@/layout/header-aside/header";
import KrTabs from "@/layout/header-aside/tabs/index.vue";
import KrDropdown from "@/layout/header-aside/dropdown/index.vue";
import krToolBar from "@/layout/header-aside/tool-bar/index.vue";
import krSetting from "@/layout/header-aside/setting/index.vue";
import CustomToolbar from "@/layout/custom/custom-toolbar/index.vue";
// @ts-ignore
import profileEdit from "@/components/form-dialog/profile-edit/index.vue";
import profilePassword from "@/components/form-dialog/profile-password/index.vue";

@Component({
  name: "layout",
  components: {
    KrHeader,
    KrAside,
    KrTabs,
    KrDropdown,
    krToolBar,
    krSetting,
    CustomToolbar,
    profileEdit,
    profilePassword
  }
})
export default class extends Mixins(PageMixin) {
  // 定义refs的属性和类型
  "$refs": {
    aside: KrAside;
    setting: krSetting;
    // @ts-ignore
    profile: profileEdit;
    // @ts-ignore
    profilePassword: profilePassword;
  };
  @State(state => state.krAdmin.page.keepAlive)
  keepAlive!: string[];
  @State(state => state.krAdmin.menu.asideCollapse)
  asideCollapse!: boolean;
  @State(state => state.krAdmin.transition.actived)
  activedTransitionName!: string;
  @Action("krAdmin/menu/asideCollapseToggle")
  handleAsideCollapseToggle!: any;

  get logoSrc(): string {
    let name: string = "all";
    if (this.asideCollapse) {
      name = "icon_only";
    }
    return `/images/theme/default/logo/${name}.png`;
  }
  handleRefresh() {
    window.location.reload();
  }
  handleProfileChooseed(command: ProfileOptions) {
    switch (command) {
      case ProfileOptions.password:
        this.$refs.profilePassword.open();
        break;
      case ProfileOptions.profile:
        this.$refs.profile.open();
        break;
      case ProfileOptions.personality:
        this.$refs.setting.open();
        break;
      case ProfileOptions.clearCache:
        this.$confirm("清除缓存需要重载页面，是否继续？", "提示", {
          type: "warning"
        })
          .then(() => {
            db.removeItem(KEY)
              .then(this.handleRefresh)
              .catch(this.handleRefresh);
          })
          .catch(() => {
            //
          });
        break;
      case ProfileOptions.logOut:
        this.$confirm("退出登录后需要重新登录，是否继续？", "提示", {
          type: "warning"
        })
          .then(() => {
            Cookies.remove("token");
            db.clear()
              .then(this.handleRefresh)
              .catch(this.handleRefresh);
          })
          .catch(() => {
            //
          });
        break;
      default:
        break;
    }
  }
  async handleProfileSubmit({ field, cancel, close }: any) {
    const [data, err] = await this.$http.put("/user/getOneself", field);
    if (err) {
      err.showAlert();
      cancel();
      return;
    }
    await db.setItem("token", data);
    this.$message.success("修改成功！");
    close();
    this.syncProfile();
  }
  async syncProfile() {
    const [data, err] = await this.$http.get("/user/getOneself");
    if (err) {
      err.showAlert();
      return;
    }
    this.$store.commit("krAdmin/user/setUser", data);
  }
  async handleProfilePasswordSubmit({ field, cancel, close }: any) {
    const [data, err] = await this.$http.put("/user/updateOneselfPsw", field);
    if (err) {
      err.showAlert();
      cancel();
      return;
    }
    this.$message.success("修改成功！");
    close();
  }
}
</script>