export const exportUserColumns = [
  {
    label: "编号",
    value: "id",
    width: 20,
  },
  {
    label: "姓名",
    value: "name",
    width: 20,
  },
  {
    label: "登录名",
    value: "login",
    width: 20,
  },
  {
    label: "手机号码",
    value: "phone",
    width: 20,
  },
  {
    label: "状态",
    width: 20,
    // value: "status",
    format: (row, index) => {
      return row.status === 0 ? "禁用" : "启用";
    }
  }
]