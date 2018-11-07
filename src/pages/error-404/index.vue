<template>
  <div>
    <h3>Error 404</h3>
    <el-button @click="$router.replace('/')">返回首页</el-button>
  </div>
</template>
<script lang="ts">
import {Component, Vue } from "vue-property-decorator";
import { CreateElement } from "vue";

@Component({
  name: "not-found",
})
export default class extends Vue {

}
</script>


