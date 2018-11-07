<template>
  <div
    class="d2-contextmenu"
    v-show="flag"
    :style="style">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Menu } from "@/types/menu";
@Component({
  name: "contextmenu",
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: boolean;
  @Prop({ type: Number, default: 0 })
  x!: number;
  @Prop({ type: Number, default: 0 })
  y!: number;

  get flag() {
    if (this.visible) {
      // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
      window.addEventListener("mousedown", this.watchContextmenu);
    }
    return this.visible;
  }
  set flag(newVal) {
    this.$emit("update:visible", newVal);
  }
  get style() {
    return {
      left: this.x + "px",
      top: this.y + "px",
      display: this.visible ? "block" : "none",
    };
  }
  watchContextmenu(event: any) {
      if (!this.$el.contains(event.target) || event.button !== 0) {
        this.flag = false;
      }
      window.removeEventListener("mousedown", this.watchContextmenu);
    }
  mounted() {
    // 将菜单放置到body下
    const body = document.querySelector("body");
    if (body) {
      body.appendChild(this.$el);
    }
  }
}
</script>


<style>
.d2-contextmenu {
  position: absolute;
  padding: 5px 0;
  z-index: 2018;
  background: #FFF;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
