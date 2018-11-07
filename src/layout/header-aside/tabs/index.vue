<template>
  <div>
    <d2-contextmenu :visible.sync="contextmenuFlag"
                    :x="contentmenuX"
                    :y="contentmenuY">
          <d2-contextmenu-list :menulist="contextmenuList"
                               @rowClick="handleContextMenuClick" />
        </d2-contextmenu>
    <el-tabs type="card"
           class="el-tabs-card"
           :value="current"
           @contextmenu.native="handleContextmenu"
           @tab-click="handleClick"
           @edit="handleEdit">
    <el-tab-pane :key="item.name"
                 v-for="item of tabs"
                 :closable="tabs.length !== 1"
                 :name="item.name">
      <template slot="label">
        <span>{{ item.meta.title }}</span>
        <span @click="handlePageCommandChooseed(0)" v-show="current === item.name" class="el-icon-refresh __el_tab_refresh"></span>
      </template>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { Page } from "@/types/page";
import { State, Action } from "vuex-class";
import PageMixin from "@/layout/header-aside/mixin/page";
import D2Contextmenu from "@/layout/header-aside/components/contextmenu/index.vue";
import D2ContextmenuList from "@/layout/header-aside/components/contextmenu/components/contentmenuList/index.vue";
import { DropdownType } from "@/types/enums";

@Component({
  name: "tabs",
  components: {
    D2Contextmenu,
    D2ContextmenuList,
  },
})
export default class extends Mixins(PageMixin) {
  contextmenuFlag = false;
  contentmenuX = 0;
  contentmenuY = 0;

  contextmenuList = [
    { value: DropdownType.refresh, title: "刷新页面", icon: "refresh" },
    { value: DropdownType.closeLeft, title: "关闭左侧", icon: "d-arrow-left" },
    { value: DropdownType.closeRight, title: "关闭右侧", icon: "d-arrow-right" },
    { value: DropdownType.closeOther, title: "关闭其它", icon: "close" },
    // { value: DropdownType.closeAll, title: "关闭全部", icon: "circle-close" },
  ];
  tagName = "";
  // get firstTagName(): string {
  //   return this.tabs[0].name;
  // }
  @State(state => state.krAdmin.page.pool)
  tabs!: Page[];
  @State(state => state.krAdmin.page.current)
  current!: string;
  @Action("krAdmin/page/close")
  handleClosePage!: any;

  handleClick(tab: { name: string }) {
    if (this.current === tab.name) {
      return;
    }
    const page = this.tabs.find(p => p.name === tab.name);
    if (page) {
      const { name, query, params } = page;
      this.$router.push(page);
    }
  }
  handleEdit(tagName: string, action: string) {
    switch (action) {
      case "remove":
        this.handleClosePage({ tagName, vm: this });
        break;
      default:
        break;
    }
  }

  handleContextmenu(event: MouseEvent) {
    let target = event.target as any;
    let flag = false;
    if (target.className.indexOf("el-tabs__item") > -1) {
      flag = true;
    } else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
      target = target.parentNode;
      flag = true;
    }
    if (flag) {
      event.preventDefault();
      event.stopPropagation();
      this.contentmenuX = event.clientX;
      this.contentmenuY = event.clientY;
      this.tagName = target.getAttribute("aria-controls").slice(5);
      this.contextmenuFlag = true;
    }
  }
  handleContextMenuClick(command: number) {
    this.contextmenuFlag = false;
    this.handlePageCommandChooseed(+command as DropdownType, this.tagName);
  }
}
</script>
