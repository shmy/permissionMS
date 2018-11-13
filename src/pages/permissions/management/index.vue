<template>
  <div>
    <permissions-create @add="handleAddSubmit($event)"
                        @edit="handleEditSubmit($event)"
                        ref="permissionsCreateDialog" />
    <div class="bg-white">
      <div class="text-right padding-10">
        <el-button @click="handleOpenAddDialog()"
                   type="primary">
          <i class="fa fa-plus"></i>
          新增顶级权限
        </el-button>
      </div>
      <div class="padding-10">
        <tree-grid :columns="columns"
                   :data-source="data"
                   :default-expand-all="false" />
      </div>

    </div>
  </div>
</template>
<script>
import permissionsCreate from "@/components/form-dialog/permissions-create";
import cloneDeep from "lodash/cloneDeep";
import { formatTimeStamp, recursion } from "@/libs/util";
const typeMap = ["目录", "菜单", "按钮"];
const typeMapStyle = ["success", "danger", "warning"];
const getTypeText = (h, val) => {
  return (
    <el-tag size="small" type={typeMapStyle[val] || ""}>
      {typeMap[val] || "未知"}
    </el-tag>
  );
};
const cleaningData = row => {
  row.children = null;
  row._expanded = null;
  row._level = null;
  row._show = null;
  // row._parent = null;
  return row;
};

export default {
  data() {
    const self = this;
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
          label: "类型",
          width: "80px",
          component: {
            render(h, row) {
              return getTypeText(h, row.type);
            }
          }
        },
        {
          label: "地址",
          prop: "url",
          width: "500px"
        },
        {
          label: "操作",
          fixed: "right",
          width: "180px",
          component: {
            render: (h, row) => {
              return (
                <span>
                  <el-button
                    type="success"
                    onClick={() =>
                      this.handleRowEdit(cleaningData(cloneDeep(row)))
                    }
                    size="mini"
                  >
                    <i class="fa fa-edit" />
                  </el-button>
                  <el-button
                    type="danger"
                    disabled={row.children !== undefined}
                    onClick={() => this.handleRowDel(row.id, row.name)}
                    size="mini"
                  >
                    <i class="fa fa-remove" />
                  </el-button>
                  <el-button
                    disabled={row.type === 2}
                    onClick={() => this.handleRowAdd(row.id, row.name)}
                    type="primary"
                    size="mini"
                  >
                    <i class="fa fa-plus" />
                  </el-button>
                </span>
              );
            }
          }
        }
      ],
      data: []
    };
  },
  components: {
    permissionsCreate
  },
  created() {
    this.fetch();
  },
  methods: {
    handleRowEdit(row) {
      let defaultParents = [{ label: "根目录", value: 0 }];
      if (row._parent) {
        defaultParents = [{ label: row._parent.name, value: row.pid }];
        row._parent = null;
      }
      this.$refs.permissionsCreateDialog.open(
        row,
        "编辑",
        "edit",
        defaultParents
      );
    },
    handleRowDel(id, name) {
      this.$confirm(`确实要删除 "${name}" 这条数据吗？`, {
        type: "warning"
      })
        .then(async () => {
          const [data, err] = await this.$http.delete(`/auth/remove?id=${id}`);
          if (err) {
            err.showAlert();
            return;
          }
          this.fetch();
        })
        .catch(() => {
          //
        });
    },
    handleRowAdd(id, name) {
      this.$refs.permissionsCreateDialog.open(
        {
          pid: id
        },
        "新增",
        "add",
        [{ label: name, value: id }]
      );
    },
    handleOpenAddDialog() {
      this.$refs.permissionsCreateDialog.open(null, "新增顶级", "add", [
        { label: "根目录", value: 0 }
      ]);
    },
    async fetch() {
      const [data, err] = await this.$http.get("/auth");
      if (err) {
        err.showAlert();
        return;
      }
      this.data = recursion(data, "id", "pid", 0);
    },
    async handleAddSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.post("/auth/save", field);
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
        `/auth/update?id=${field.id}`,
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
    }
  }
};
</script>
