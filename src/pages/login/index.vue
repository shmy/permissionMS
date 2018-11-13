<template>
  <div class="victor_login_page relative"
       ref="container"
       flex="dir:left main:center cross:center">
    <div ref="output"
         class="anit_out absolute absolute-full"></div>
    <el-form class="login_form">
      <h3 class="text-center">登录</h3>
      <el-form-item>
        <div flex="dir:left">
          <el-select size="small"
                     style="width: 120px; margin-right: 10px"
                     v-model="loginType">
            <el-option v-for="item of loginTypes"
                       :value="item.value"
                       :label="item.label"
                       :key="item.value">
            </el-option>
          </el-select>
          <el-input flex-box="1"
                    size="small"
                    :placeholder="`请输入${loginType === 'login' ? '用户名' : '手机号'}`"
                    :disabled="inTheSubmission || redirecting"
                    v-model="theForm.login"></el-input>
        </div>

      </el-form-item>
      <el-form-item>
        <div flex="dir:left">
          <div style="width: 60px;margin-right: 10px">密码：</div>
          <el-input size="small"
                    flex-box="1"
                    placeholder="请输入密码"
                    type="password"
                    @keyup.enter.native="handleLoginSubmit()"
                    :disabled="inTheSubmission || redirecting"
                    v-model="theForm.password"></el-input>
        </div>
      </el-form-item>
      <el-form-item class="text-center"
                    label-width="0px">
        <el-button size="medium"
                   :loading="inTheSubmission"
                   :disabled="redirecting"
                   @click="handleLoginSubmit()"
                   type="primary">{{ LoginStateText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
// 简介登录模板
import { Component, Vue } from "vue-property-decorator";
import { db } from "@/libs/util";
// @ts-ignore
import Victor from "@/libs/victor.js";

@Component({
  name: "name",
  components: {
    // todo
  }
})
export default class extends Vue {
  loginTypes = [
    { label: "用户名", value: "login" },
    { label: "手机号", value: "phone" }
  ];
  loginType = "login";
  theForm = {
    login: "admin",
    password: "123456"
  };
  redirecting = false;
  inTheSubmission = false;
  get LoginStateText(): string {
    if (this.inTheSubmission) {
      return "登录中";
    }
    if (this.redirecting) {
      return "登录成功";
    }
    return "登录";
  }
  async handleLoginSubmit() {
    this.inTheSubmission = true;
    const body: any = {
      password: this.theForm.password,
    };
    body[this.loginType] = this.theForm.login;
    const [data, err, res] = await this.$http.post("/login", body);
    this.inTheSubmission = false;
    if (err !== null) {
      // if err
      // show the err alert
      err.showAlert();
      return;
    }
    await db.setItem("token", data);
    this.redirecting = true;
    // 此处无法优雅关闭背景效果， 故重新刷新进入首页
    window.location.href = process.env.BASE_URL;
  }
  mounted() {
    this.$nextTick(() => {
      // @ts-ignore
      new Victor(this.$refs.container, this.$refs.output);
    });
  }
}
</script>
<style lang="scss">
.victor_login_page {
  height: 100%;
  width: 100%;
  background-color: #003553;
  .anit_out {
    z-index: 1;
  }
  .login_form {
    background-color: #fff;
    opacity: 0.9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
}
</style>
