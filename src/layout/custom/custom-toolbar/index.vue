<template>
  <!-- 系统选择 -->
  <div class="el-form-item__content" style="padding-top: 10px;">
    <el-select :disabled="switching"
               size="small"
               @change="handleChanged($event)"
               :value="systemListActived">
      <el-option v-for="item of systemList"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import find from "lodash/find";
import { db } from "@/libs/util";

export default {
  data: () => ({
    switching: false,
    tmpId: 0,
  }),
  computed: {
    ...mapState({
      systemList: state => state.project.system.list
    }),
    systemListActived() {
      if (this.tmpId) {
        return this.tmpId;
      }
      if (!this.systemList.length) {
        return "";
      }
      const r = find(this.systemList, item => item.type === 1);
      if (r) {
        return r.id;
      }
      return this.systemList[0].id;
    }
  },
  methods: {
    async handleChanged(id) {
      this.switching = true;
      this.tmpId = id;
      const [data, err] = await this.$http.put("/system/query", {
        id,
      });
      this.switching = false;
      if (err) {
        this.tmpId = 0;
        err.showAlert();
        return;
      }
      await db.setItem("token", data);
      window.location.reload();
    }
  }
};
</script>
