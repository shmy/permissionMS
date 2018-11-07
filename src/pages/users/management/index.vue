<template>
  <div>
    <user-create ref="userCreateDialog"
                 @add="handleAddSubmit($event)"
                 @edit="handleEditSubmit($event)" />
    <user-change-pwd ref="userChangePwdDialog"
                     @submit="handleRestPwd($event)" />
    <div class="bg-white padding-10">
      <div class="text-right">
        <el-button @click="handleOpenAddDialog()"
                   type="primary">
          <i class="fa fa-plus"></i>
          新增用户
        </el-button>
      </div>
      <d2-crud ref="d2Crud"
               selection-row
               :columns="columns"
               @selection-change="handleSelectionChange($event)"
               :data="data"
               :options="options" />

      <div flex="dir:left">
        <el-button size="small"
                   :disabled="!selected.length"
                   @click="handleRemove()"
                   type="danger">
          <i class="fa fa-remove"></i>
          &nbsp;&nbsp;删除{{ selected.length ? ` (${selected.length}条)` : ''}}
        </el-button>
        <el-pagination flex-box="1"
                       @size-change="handleSizeChange($event)"
                       @current-change="handleCurrentChange($event)"
                       :page-sizes="pagesizes"
                       :current-page.sync="paging.page"
                       :page-size.sync="paging.pagesize"
                       :layout="layout"
                       :total="total" />
      </div>
    </div>
  </div>
</template>
<script>
import TablePagingMixin from "@/mixin/table-paging";
import userCreate from "@/components/form-dialog/user-create";
import userChangePwd from "@/components/form-dialog/user-change-pwd";
import cloneDeep from "lodash/cloneDeep";
import { formatTimeStamp } from "@/libs/util";
export default {
  mixins: [TablePagingMixin],
  data() {
    return {
      columns: [
        {
          title: "编号",
          key: "id",
          width: "80"
        },
        {
          title: "姓名",
          key: "name",
          width: "180"
        },
        {
          title: "登录名",
          width: "180",
          key: "login"
        },
        {
          title: "手机号码",
          width: "180",
          key: "phone"
        },
        {
          title: "状态",
          width: "80",
          component: {
            render: (h, row) => {
              const style = row.status === 1 ? "color: green" : "color: red";
              const label = row.status === 1 ? "正常" : "禁用";
              return <span style={style}>{label}</span>;
            }
          }
        },
        {
          title: "创建时间",
          width: "140",
          component: {
            render: (h, row) => {
              return (
                <span class="text-center" style="width: 140px">
                  {formatTimeStamp(row.creattime)}
                </span>
              );
            }
          }
        },
        {
          title: "操作",
          width: "180",
          fixed: "right",
          component: {
            render: (h, row) => {
              return (
                <span>
                  <el-button
                    size="small"
                    type="primary"
                    plain
                    onClick={() => this.handleRowEdit(cloneDeep(row))}
                  >
                    <i class="fa fa-edit" />
                    &nbsp;&nbsp;编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="info"
                    onClick={() => this.handleRowChangePwd(row.id)}
                  >
                    <i class="fa fa-lock" />
                    &nbsp;&nbsp;改密
                  </el-button>
                </span>
              );
            }
          }
        }
      ],
      data: [],
      selected: [],
      options: {
        stripe: true,
        border: true,
        sortable: true
      }
    };
  },
  components: {
    userCreate,
    userChangePwd
  },
  methods: {
    handleRowEdit(row) {
      this.$refs.userCreateDialog.open(row, "编辑", "edit");
    },
    handleRowChangePwd(id) {
      this.$refs.userChangePwdDialog.open({ id, });
    },
    handleOpenAddDialog() {
      this.$refs.userCreateDialog.open();
    },
    handleSelectionChange(e) {
      this.selected = e.map(item => item.id);
    },
    async fetch() {
      const params = {
        offset: (this.paging.page - 1) * this.paging.pagesize,
        limit: this.paging.pagesize
      };
      const [data, err] = await this.$http.get("/user", {
        params
      });
      if (err) {
        err.showAlert();
        return;
      }
      this.total = data.total;
      this.data = data.rows;
    },
    async handleAddSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.post("/user/save", field);
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
        `/user/update?id=${field.id}`,
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
    async handleRestPwd({ field, cancel, close }) {
      const [data, err] = await this.$http.put("/user/adminResetPwd", {
        id: field.id,
        pwdNew: field.password
      });
      if (err) {
        err.showAlert();
        cancel();
        return;
      }
      this.$message.success("修改成功！");
      close();
    },
    handleRemove() {
      this.$confirm(`确实要删除所选的${this.selected.length}条数据吗？`, {
        type: "warning"
      })
        .then(async () => {
          const [data, err] = await this.$http.delete(
            `/user/remove?ids=${this.selected.join(",")}`
          );
          if (err) {
            err.showAlert();
            return;
          }
          this.fetch();
        })
        .catch(() => {
          //
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
