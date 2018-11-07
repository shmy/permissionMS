<template>
  <el-dialog center
             :title="`${title}用户密码`"
             :visible.sync="visible"
             custom-class="el-dialog-container-mini"
             :append-to-body="true"
             @closed="handleClose()"
             :show-close="!loading"
             :close-on-click-modal="!loading"
             :close-on-press-escape="!loading">
    <el-form ref="ruleForm"
             size="small"
             label-position="top"
             :disabled="loading"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-form-item label="新的登录密码"
                    prop="password"
                    required>
        <el-input placeholder="请输入新的登录密码"
                  v-model="ruleForm.password"></el-input>
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
  id: "",
  password: "",
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      password: { required: true, message: "请输入密码", trigger: "blur" }
    }
  }),
  methods: {
    open(parameter, title = "重置", eventName = "submit") {
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
<style lang="scss">
.el-dialog-container-mini {
  height: 280px;
  width: 400px;
}
</style>
