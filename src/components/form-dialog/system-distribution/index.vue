<template>
  <el-dialog center
             title="分配默认权限"
             :visible.sync="visible"
             custom-class="el-dialog-container"
             :append-to-body="true"
             @closed="handleClose()"
             :show-close="!loading"
             :close-on-click-modal="!loading"
             :close-on-press-escape="!loading">

    <el-tree :data="data"
             show-checkbox
             node-key="id"
             ref="tree"
             :props="defaultProps"
             :default-checked-keys="checked">
    </el-tree>
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
import { recursion } from "@/libs/util";
export default {
  data: () => ({
    visible: false,
    loading: false,
    defaultProps: {
      label: "name"
    },
    data: [],
    checked: [],
    id: -1,
  }),
  methods: {
    async open(id) {
      this.visible = true;
      this.id = id;
      const [data, err] = await this.$http.get(`/system/defaultAuth?id=${id}`);
      if (err) {
        err.showAlert();
        return;
      }
      this.data = recursion(data, "id", "pid", 0);
      this.checked = data.filter(item => item.type === 1).map(item => item.id);
    },
    handleClose() {
      this.data = [];
      this.id = -1;
      this.checked = [];
    },
    close() {
      this.loading = false;
      this.visible = false;
    },
    handleSubmit() {
      if (this.data.length === 0) {
        this.close();
        return;
      }
      this.loading = true;
      const field = this.$refs.tree.getCheckedKeys();
      this.$emit("edit", {
        field: {
          system_id: this.id,
          auth_ids: field.join(","),
        },
        cancel: () => {
          this.loading = false;
        },
        close: this.close
      });
    }
  }
};
</script>
