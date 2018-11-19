<template>
  <el-dialog center
             title="添加整套权限"
             :visible.sync="visible"
             custom-class="el-dialog-container"
             :append-to-body="true"
             label-position="top"
             @closed="handleClose()"
             :show-close="!loading"
             :close-on-click-modal="!loading"
             :close-on-press-escape="!loading">
    <el-form ref="ruleForm"
             size="small"
             :disabled="loading"
             :model="ruleForm"
             :rules="rules">

      <el-form-item label="请输入整套权限">
        <el-input placeholder="请输入整套权限"
                  type="textarea"
                  :rows="10"
                  v-model="ruleForm.text"></el-input>
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
  text: ""
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      text: { required: true, message: "请输入整套权限", trigger: "blur" }
    }
  }),
  methods: {
    open(parameter, eventName = "add") {
      if (parameter) {
        this.ruleForm = {
          ...this.ruleForm,
          ...parameter
        };
      }
      this.eventName = eventName;
      this.visible = true;
    }
  }
};
</script>
