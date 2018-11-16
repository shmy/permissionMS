<template>
  <el-dialog center
             title="分配管理员"
             :visible.sync="visible"
             custom-class="el-dialog-container"
             :append-to-body="true"
             @closed="handleClose()"
             :show-close="!loading"
             :close-on-click-modal="!loading"
             :close-on-press-escape="!loading">

    <div>
      <el-radio-group v-model="checked"
                      size="small">
        <el-radio v-for="item of data"
                  :label="item.id"
                  :key="item.id"
                  border>{{ item.name }} / {{ item.login }} / {{ item.phone }}</el-radio>
        <br>
      </el-radio-group>
    </div>
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
export default {
  data: () => ({
    visible: false,
    loading: false,
    defaultProps: {
      label: "name"
    },
    data: [],
    checked: "",
    id: -1
  }),
  methods: {
    async open(id) {
      this.visible = true;
      this.id = id;
      const [data, err] = await this.$http.get(
        `/system/distributionAdmin?id=${id}`
      );
      if (err) {
        err.showAlert();
        return;
      }
      this.data = data;
    },
    handleClose() {
      this.data = [];
      this.id = -1;
      this.checked = "";
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
      this.$emit("edit", {
        field: {
          systemId: this.id,
          userId: this.checked
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
<style lang="scss">
.el-radio {
  margin-top: 10px;
  display: block;
  margin-left: 0 !important;
}
</style>
