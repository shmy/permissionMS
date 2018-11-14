<template>
  <div>
    <user-create ref="userCreateDialog"
                 @add="handleAddSubmit($event)"
                 @edit="handleEditSubmit($event)" />
    <user-change-pwd ref="userChangePwdDialog"
                     @submit="handleRestPwd($event)" />
    <user-distribution @edit="handleDistributionSubmit($event)"
                       ref="userDistribution" />
    <div class="bg-white padding-10">

      <div class="text-right">
        <el-select style="width: 100px; margin-right: 10px"
                     v-model="searchType">
            <el-option v-for="item of searchTypes"
                       :value="item.value"
                       :label="item.label"
                       :key="item.value">
            </el-option>
          </el-select>
        <el-input style="width: 240px; margin-right: 10px;"
                  :placeholder="`请输入${searchType === 'name' ? '姓名' : '手机号'}进行搜索`"
                  v-model="serarchValue"
                  @keyup.enter.native="fetch()"></el-input>
        <el-button @click="fetch()"
                   type="success">
          <i class="fa fa-search"></i>
          搜索
        </el-button>
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
        <div>
          <el-button size="small"
                     :disabled="!selected.length"
                     @click="handleRemove()"
                     type="danger">
            <i class="fa fa-remove"></i>
            &nbsp;&nbsp;删除{{ selected.length ? ` (${selected.length}条)` : ''}}
          </el-button>
          <el-dropdown @command="cmd => handleExport(cmd)">
            <el-button size="small"
                       :disabled="!selected.length"
                       style="margin-left: 10px"
                       type="primary">
              <i class="fa fa-save"></i>
              &nbsp;&nbsp;导出数据{{ selected.length ? ` (${selected.length}条)` : ''}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="xlsx"
                                :disabled="!selected.length">导出到 excel</el-dropdown-item>
              <el-dropdown-item command="html"
                                :disabled="!selected.length">导出到 html</el-dropdown-item>
              <el-dropdown-item command="csv"
                                :disabled="!selected.length">导出到 csv</el-dropdown-item>
              <el-dropdown-item command="txt"
                                :disabled="!selected.length">导出到 txt</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

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
import jsonExport from "@/libs/json-export";
import TablePagingMixin from "@/mixin/table-paging";
import userCreate from "@/components/form-dialog/user-create";
import userChangePwd from "@/components/form-dialog/user-change-pwd";
import userDistribution from "@/components/form-dialog/user-distribution";
import cloneDeep from "lodash/cloneDeep";
import { exportUserColumns } from "@/libs/columns";
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
          width: "170",
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
                  </el-button>
                  <el-button
                    size="small"
                    type="info"
                    plain
                    onClick={() => this.handleRowChangePwd(row.id)}
                  >
                    <i class="fa fa-lock" />
                  </el-button>
                  <el-button
                    size="small"
                    type="success"
                    plain
                    onClick={() => this.handleRowDistribution(row.id)}
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
      selected: [],
      options: {
        stripe: true,
        border: true,
        sortable: true
      },
      serarchValue: "",
      searchTypes: [
        { label: "姓名", value: "name" },
        { label: "手机号", value: "phone" }
      ],
      searchType: "name"
    };
  },
  components: {
    userCreate,
    userChangePwd,
    userDistribution
  },
  methods: {
    handleRowEdit(row) {
      this.$refs.userCreateDialog.open(row, "编辑", "edit");
    },
    handleRowChangePwd(id) {
      this.$refs.userChangePwdDialog.open({ id });
    },
    handleRowDistribution(id) {
      this.$refs.userDistribution.open(id);
    },
    handleOpenAddDialog() {
      this.$refs.userCreateDialog.open();
    },
    handleSelectionChange(e) {
      this.selected = e.map(item => item.id);
    },
    handleExport(cmd) {
      const data = this.data.filter(item => {
        return this.selected.indexOf(item.id) !== -1;
      });
      if (data.length) {
        jsonExport(exportUserColumns, data, `导出数据(${data.length})条`, cmd);
      }
    },
    async fetch() {
      const params = {
        offset: (this.paging.page - 1) * this.paging.pagesize,
        limit: this.paging.pagesize,
      };
      params[this.searchType] = this.serarchValue;
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
    },
    async handleDistributionSubmit({ field, cancel, close }) {
      const [data, err] = await this.$http.put("/user/authUpdate", field);
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
