<template>
  <div>
    <h3>Error 403</h3>
    <h3>你没有权限访问此页面。</h3>
    <el-button @click="$router.replace('/')">返回首页</el-button>
    <el-button type="primary" @click="$router.replace('/login')">重新登录</el-button>
  </div>
</template>

