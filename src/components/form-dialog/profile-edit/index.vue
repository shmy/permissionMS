<template>
  <el-dialog center
             title="修改资料"
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

      <el-form-item label="手机号码"
                    prop="phone"
                    required>
        <el-input placeholder="请输入手机号码"
                  v-model="ruleForm.phone"></el-input>
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
import { getProfile } from '@/libs/init';
const getDefaultForm = () => ({
  id: "",
  login: "",
  name: "",
  phone: "",
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      login: { required: true, message: "请输入登录账号", trigger: "blur" },
      name: { required: true, message: "请输入姓名", trigger: "blur" },
      phone: { required: true, message: "请输入手机号码", trigger: "blur" },
    }
  }),
  methods: {
    async open(eventName = "edit") {
      this.eventName = eventName;
      this.visible = true;
      const [data, err] = await getProfile();
      if (err) {
        this.visible = false;
        err.showAlert();
      }
      this.ruleForm.id = data.id;
      this.ruleForm.login = data.login;
      this.ruleForm.phone = data.phone;
      this.ruleForm.name = data.name;
    }
  }
};
</script>
