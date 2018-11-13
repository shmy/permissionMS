<template>
  <el-dialog center
             title="修改密码"
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
      <el-form-item label="原密码"
                    prop="pwdOld"
                    required>
        <el-input placeholder="请输原密码"
                  type="password"
                  v-model="ruleForm.pwdOld"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="pwdNew"
                    required>
        <el-input placeholder="请输入新密码"
                  type="password"
                  v-model="ruleForm.pwdNew"></el-input>
      </el-form-item>

      <el-form-item label="确认密码"
                    prop="pwdNewSure"
                    required>
        <el-input placeholder="请确认新密码"
                  type="password"
                  v-model="ruleForm.pwdNewSure"></el-input>
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
import { getProfile } from "@/libs/init";
const getDefaultForm = () => ({
  pwdOld: "",
  pwdNew: "",
  pwdNewSure: ""
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      pwdOld: { required: true, message: "请输入原密码", trigger: "blur" },
      pwdNew: { required: true, message: "请输入新密码", trigger: "blur" },
      pwdNewSure: { required: true, message: "请再次输入新密码", trigger: "blur" }
    }
  }),
  methods: {
    async open(eventName = "edit") {
      this.eventName = eventName;
      this.visible = true;
    }
  }
};
</script>
