<template>
  <el-dialog center
             :title="`${title}权限`"
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
      <el-form-item label="上级权限"
                    prop="pid"
                    required>
        <el-select placeholder="请选择权限类型"
                   style="width: 100%"
                   v-model="ruleForm.pid">
          <el-option v-for="item of parents"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限名称"
                    prop="name"
                    required>
        <el-input placeholder="请输入权限名称"
                  v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="权限类型"
                    prop="type"
                    required>
        <el-select placeholder="请选择权限类型"
                   style="width: 100%"
                   v-model="ruleForm.type">
          <el-option v-for="item of types"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="链接地址"
                    prop="url"
                    required>
        <el-input placeholder="请输入链接地址"
                  v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="请求方法">
        <el-input placeholder="请输入请求方法"
                  v-model="ruleForm.method"></el-input>
      </el-form-item>
      <el-form-item label="排序号"
                    prop="sort"
                    required>
        <el-input-number placeholder="请输入排序号"
                         v-model="ruleForm.sort"></el-input-number>
      </el-form-item>
      <el-form-item label="图标">
        <el-input placeholder="请输入图标"
                  v-model="ruleForm.icon"></el-input>
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
  pid: 0,
  url: "",
  method: "",
  sort: 0,
  type: 0,
  icon: ""
});
export default {
  mixins: [formDialogMixin(getDefaultForm)],
  data: () => ({
    rules: {
      pid: { required: true, message: "请选择上级权限", trigger: "blur" },
      name: { required: true, message: "请输入权限名称", trigger: "blur" },
      url: { required: true, message: "请输入链接地址", trigger: "blur" },
      type: { required: true, message: "请选择权限类型", trigger: "blur" }
    },
    types: [
      { label: "目录", value: 0 },
      { label: "菜单", value: 1 },
      { label: "按钮", value: 2 }
    ],
    parents: [],
  }),
  methods: {
    open(parameter, title = "新增", eventName = "add", parents = []) {
      if (parameter) {
        this.ruleForm = {
          ...this.ruleForm,
          ...parameter
        };
      }
      this.title = title;
      this.eventName = eventName;
      this.parents = parents;
      this.visible = true;
    }
  }
};
</script>
