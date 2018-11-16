<template>
  <div>
    <system-create :parents="parents"
                   @add="handleAddSubmit($event)"
                   @edit="handleEditSubmit($event)"
                   ref="systemCreateDialog" />
    <system-distribution @edit="handleDistributionSubmit($event)"
                         ref="systemDistribution" />
    <system-distribution-user @edit="handleDistributionUserSubmit($event)"
                              ref="systemDistributionUser" />
    <div class="bg-white">
      <div class="text-right padding-10">
        <el-button @click="handleOpenAddDialog()"
                   type="primary">
          <i class="fa fa-plus"></i>
          新增系统
        </el-button>
      </div>
      <div class="padding-10">
        <tree-grid :columns="columns"
                   :data-source="data"
                   :default-expand-all="true" />
      </div>
    </div>
  </div>
</template>
<script>
import systemCreate from "@/components/form-dialog/system-create";
import systemDistribution from "@/components/form-dialog/system-distribution";
import systemDistributionUser from "@/components/form-dialog/system-distribution-user";
import cloneDeep from "lodash/cloneDeep";
import { formatTimeStamp, recursion } from "@/libs/util";
const cleaningData = row => {
  row.children = null;
  row._expanded = null;
  row._level = null;
  row._show = null;
  row._parent = null;
  return row;
};
export default {
  data() {
    return {
      columns: [
        {
          label: "编号",
          prop: "id",
          width: "60px",
          align: "center"
        },
        {
          label: "名称",
          align: "left",
          prop: "name",
          width: "280px",
          showToggle: true
        },
        {
          label: "状态",
          width: "80px",
          component: {
            render(h, row) {
              const style = row.status === 1 ? "color: green" : "color: red";
              const label = row.status === 1 ? "正常" : "禁用";
              return (
                <span class="text-center" style={style + ";width: 60px"}>
                  {label}
                </span>
              );
            }
          }
        },
        {
          label: "Key",
          align: "left",
          prop: "sysKey",
          width: "280px"
        },
        {
          label: "操作",
          fixed: "right",
          width: "180px",
          component: {
            render: (h, row) => {
              return (
                <span class="text-center" style="width: 100px">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    on-click={e =>
                      this.handleRowEdit(cleaningData(cloneDeep(row)))
                    }
                  >
                    <i class="fa fa-edit" />
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    on-click={e => this.handleRowDistributionUser(row.id)}
                  >
                    <i class="fa fa-user" />
                  </el-button>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    on-click={e => this.handleRowDistribution(row.id)}
                  >
                    <i class="fa fa-sliders" />
                  </el-button>
                </span>
              );
            }
          }
        }
      ],
      data: [],
      parents: []
    };
  },
  components: {
    systemCreate,
    systemDistribution,
    systemDistributionUser
  },
  methods: {
    handleRowEdit(row) {
      this.$refs.systemCreateDialog.open(row, "编辑", "edit");
    },
    handleRowDistribution(id) {
      this.$refs.systemDistribution.open(id);
    },
    handleRowDistributionUser(id) {
      this.$refs.systemDistributionUser.open(id);
    },
    handleOpenAddDialog() {
      this.$refs.systemCreateDialog.open();
    },
    async fetch() {
      const [data, err] = await this.$http.get("/system");
      if (err) {
        err.showAlert();
        return;
      }
      // 找到最顶级的pid
      let minPid = 100;
      data.forEach(item => {
        if (item.pid < minPid) {
          minPid = item.pid;
        }
      });
      this.data = recursion(data, "id", "pid", minPid);
      const parents = [];
      this.data.forEach(item => {
        if (item.pid === 0) {
          parents.push({
            label: item.name,
            value: item.id
          });
        }
      });
      this.parents = parents;
    },
    async handleAddSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.post("/system/save", field);
      if (err) {
        err.showAlert();
        cancel();
        return;
      }
      this.$message.success("添加成功！");
      close();
      this.fetch();
    },
    async handleEditSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.put(
        `/system/update?id=${field.id}`,
        field
      );
      if (err) {
        err.showAlert();
        cancel();
        return;
      }
      this.$message.success("编辑成功！");
      close();
      this.fetch();
    },
    async handleDistributionSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.put("/system/defaultAuth", field);
      if (err) {
        err.showAlert();
        cancel();
        return;
      }
      close();
      this.$message.success("分配完毕");
    },
    async handleDistributionUserSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.post("/system/distributionAdmin", field);
      if (err) {
        err.showAlert();
        cancel();
        return;
      }
      close();
      this.$message.success("分配完毕");
    }
  },
  created() {
    this.fetch();
  }
};
</script>
