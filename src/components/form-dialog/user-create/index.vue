<template>
  <el-dialog center
             :title="`${title}用户`"
             :visible.sync="visible"
             custom-class="el-dialog-container"
             :append-to-body="true"
             @closed="handleClose()"
             :show-close="!loading"
             :close-on-click-modal="!loading"
             :close-on-press-escape="!loading">
    <el-form ref="ruleForm"
             size="small"
             :disabled="loading"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-form-item label="姓名"
                    prop="name"
                    required>
        <el-input placeholder="请输入姓名"
                  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="登录账号"
                    prop="login"
                    required>
        <el-input placeholder="请输入登录账号"
                  v-model="ruleForm.login"></el-input>
      </el-form-item>

      <el-form-item label="登录密码"
                    prop="password"
                    v-if="eventName === 'add'"
                    required>
        <el-input placeholder="请输入登录密码"
                  v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号码"
                    prop="phone"
                    required>
        <el-input placeholder="请输入手机号码"
                  v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="类型"
                    required>
        <el-radio v-model="ruleForm.type" :label="1">普通用户</el-radio>
        <el-radio v-model="ruleForm.type" :label="0">管理员</el-radio>
      </el-form-item>
      <el-form-item label="是否启用"
                    required>
        <el-switch v-model="ruleForm.status"
                   :active-value="1"
                   active-text="启用"
                   inactive-text="禁用"
                   :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button :disabled="loading"
                 @click="visible = false">取 消</el-button>
      <el-button :loading="loading"
                 type="primary"
                 @click="handleSubmit()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import formDialogMixin from "@/mixin/form-dialog-cu";
const getDefaultForm = () => ({
  login: "",
  name: "",
  phone: "",
  password: "",
  status: 1,
  type: 1
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      login: { required: true, message: "请输入登录账号", trigger: "blur" },
      name: { required: true, message: "请输入姓名", trigger: "blur" },
      phone: { required: true, message: "请输入手机号码", trigger: "blur" },
      password: { required: true, message: "请输入密码", trigger: "blur" }
    }
  }),
  methods: {
    open(parameter, title = "新增", eventName = "add") {
      if (parameter) {
        this.ruleForm = {
          ...this.ruleForm,
          ...parameter
        };
      }
      this.title = title;
      this.eventName = eventName;
      this.visible = true;
    }
  }
};
</script>
