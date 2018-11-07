import cloneDeep from "lodash/cloneDeep";

export default (getDefaultForm, ruleForm = 'ruleForm') => ({
  data: () => ({
    title: "",
    eventName: "",
    visible: false,
    loading: false,
    ruleForm: getDefaultForm(),
  }),
  methods: {
    scrollTop() {
      this.$nextTick(() => {
        const el = this.$el.querySelector('.el-dialog__body');
        if (el) {
          el.scrollTop = 0;
        }
      });
    },
    close() {
      this.loading = false;
      this.visible = false;
    },
    handleClose() {
      this.ruleForm = getDefaultForm();
      this.$refs[ruleForm].resetFields();
    },
    handleSubmit() {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$emit(this.eventName, {
            field: cloneDeep(this.ruleForm),
            cancel: () => {
              this.loading = false
            },
            close: this.close
          });
        } else {
          return false;
        }
      });
    }
  }
})
