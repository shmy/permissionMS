<template>
  <el-dialog center
             :title="`${title}系统`"
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
      <el-form-item label="上级系统"
                    prop="pid"
                    v-show="ruleForm.pid !== 0"
                    required>
        <el-select v-model="ruleForm.pid"
                   placeholder="请选择上级系统"
                   style="width: 100%">
          <el-option v-for="item of parents"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统名称"
                    prop="name"
                    required>
        <el-input placeholder="请输入系统名称"
                  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码"
                  v-model="ruleForm.phone"></el-input>
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
  name: "",
  phone: "",
  pid: "",
  status: 1
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      pid: { required: true, message: "请选择上级系统", trigger: "blur" },
      name: { required: true, message: "请输入系统名称", trigger: "blur" },
      // phone: { required: true, message: "请输入手机号码", trigger: "blur" }
    },
  }),
  props: {
    parents: {
      type: Array,
      default: () => ([])
    }
  },
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
      // if (this.parents.length > 0 && this.ruleForm.pid == "") {
      //   this.ruleForm.pid = this.parents[0].value;
      // }
      this.visible = true;
    }
  }
};
</script>
