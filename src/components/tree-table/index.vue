<template>
  <el-table border
            :data="data"
            :row-style="rowStyle"
            :max-height="_maxHeight"
            style="width: 100%">
    <el-table-column v-for="(column, index) in columns"
                     v-if="!column.hidden"
                     :key="index"
                     :label="column.label"
                     :width="column.width"
                     :align="column.align || 'center'"
                     :class-name="column.className"
                     :fixed="column.fixed">
      <template slot-scope="scope">
        <template v-if="column.showToggle">
          <span v-if="column.showToggle"
                v-for="item in scope.row._level"
                :key="item"
                class="ms-tree-space" />
          <div v-if="column.showToggle && toggleIconShow(index, scope.row)"
               class="show-child-btn"
               @click="toggle(scope.$index)">
            <i :class="[
                'el-icon el-icon-arrow-right',
                scope.row._expanded ? 'down' : ''
              ]" />
          </div>
          {{ scope.row[column.prop] }}
        </template>
        <render-component v-else-if="column.component && column.component.render"
                          :render-function="column.component.render"
                          :scope="scope">
        </render-component>

        <span v-else>
          {{ scope.row[column.prop] }}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import renderComponent from "@d2-projects/d2-crud/src/components/renderComponent.vue";

export default {
  name: "tree-grid",
  components: {
    renderComponent
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 数据源与 el-table 相同
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否全部展开树形结构
    defaultExpandAll: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default() {
        return "100%";
      }
    },
    // 第几行显示可展开按钮
    index: {
      type: Number,
      default: 1
    }
  },
  computed: {
    data() {
      const data = this.createDate(
        this.dataSource,
        null,
        null,
        this.defaultExpandAll
      );
      return data;
    },
    _maxHeight() {
      return this.maxHeight;
    }
  },
  methods: {
    // 显示行
    rowStyle(args) {
      let row = args;
      if (typeof args === "object" && args.row) {
        row = args.row;
      } else {
        row = args;
      }
      row._show = row._parent
        ? row._parent._expanded && row._parent._show
        : true;
      return row._show ? "" : "display:none;";
    },
    // 展开下级
    toggle(trIndex) {
      const record = this.data[trIndex];
      record._expanded = !record._expanded;
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      if (record.children && record.children.length > 0) {
        return true;
      }
      return false;
    },
    createDate(data, parent, level, expandedAll) {
      let tmp = [];
      Array.from(data || []).forEach(record => {
        if (typeof record._expanded === "undefined") {
          this.$set(record, "_expanded", expandedAll);
        }
        if (parent) {
          this.$set(record, "_parent", parent);
        }

        let tmpLevel = 0;
        if (typeof level !== "undefined" && level !== null) {
          tmpLevel = level + 1;
        }
        this.$set(record, "_level", tmpLevel);
        tmp.push(record);
        if (record.children && record.children.length > 0) {
          const children = this.createDate(
            record.children,
            record,
            tmpLevel,
            expandedAll
          );
          tmp = tmp.concat(children);
        }
      });
      return tmp;
    }
  }
};
</script>
<style scoped lang="scss">
$height: 22px;
.show-child-btn {
  display: inline-block;
  cursor: pointer;
  width: $height;
  height: $height;
  line-height: $height;
  text-align: center;
  border: 1px solid #c5c5c5;
  border-radius: 3px;
  user-select: none;
  .el-icon-arrow-right {
    transition: transform 0.2s ease-in-out;
    position: relative;
    top: -1px;
    &.down {
      transform: rotate(90deg);
    }
  }
}

.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  line-height: 1;
  width: 18px;
  height: 14px;
}
</style>