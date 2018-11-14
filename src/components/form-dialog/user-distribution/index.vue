<template>
  <el-dialog center
             title="分配用户权限"
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
      const [data, err] = await this.$http.get(`/user/authUpdate?id=${id}`);
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
      // 包含半选节点
      const field = this.$refs.tree.getCheckedNodes(false, true).map(item => item.id);
      this.$emit("edit", {
        field: {
          userid: this.id,
          authIds: field,
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
