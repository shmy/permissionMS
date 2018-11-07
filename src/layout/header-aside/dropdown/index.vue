<template>
  <el-dropdown class="dropdown"
               split-button
               @click="onChooseed(dropdownType.closeOther)"
               @command="command => onChooseed(command)">
    <el-tooltip class="item"
                effect="dark"
                content="关闭其他"
                placement="bottom">
      <i class="el-icon-circle-close"></i>
    </el-tooltip>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="dropdownType.refresh">
        <i class="el-icon-refresh"></i>
        刷新页面
      </el-dropdown-item>
      <el-dropdown-item :command="dropdownType.closeLeft">
        <i class="el-icon-d-arrow-left"></i>
        关闭左侧
      </el-dropdown-item>
      <el-dropdown-item :command="dropdownType.closeRight">
        <i class="el-icon-d-arrow-right"></i>
        关闭右侧
      </el-dropdown-item>
      <el-dropdown-item :command="dropdownType.closeOther">
        <i class="el-icon-circle-close"></i>
        关闭其他
      </el-dropdown-item>
      <!-- <el-dropdown-item :command="dropdownType.closeAll">
        <i class="el-icon-circle-close"></i>
        全部关闭
      </el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { DropdownType } from "@/types/enums";
@Component({
  name: "dropdown",
})
export default class extends Vue {
  dropdownType = {
    refresh: DropdownType.refresh,
    closeLeft: DropdownType.closeLeft,
    closeRight: DropdownType.closeRight,
    closeOther: DropdownType.closeOther,
    closeAll: DropdownType.closeAll,
  };
  @Emit()
  onChooseed(command: DropdownType): DropdownType {
    return command;
  }
}
</script>
