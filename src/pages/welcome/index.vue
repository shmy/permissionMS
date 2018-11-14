<template>
  <h3 class="text-center">
    欢迎使用，你能访问到此页面，是因为你暂时没有任何权限，请联系管理员分配权限后<el-button @click="handleReload()" type="text">刷新页面</el-button>再试 ！
  </h3>
</template>
<script>
export default {
  methods: {
    handleReload() {
      window.location.href = process.env.BASE_URL;
    }
  }
};
</script>
