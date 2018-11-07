
export default {
  data: () => ({
    total: 1,
    pagesizes: [10, 20, 30, 40, 50],
    layout: "total, sizes, prev, pager, next, jumper",
    paging: {
      page: 1,
      pagesize: 10,
    },
  }),
  methods: {
    handleSizeChange() {
      this.paging.page = 1;
      this.fetch();
    },
    handleCurrentChange() {
      this.fetch();
    },
  }
}
