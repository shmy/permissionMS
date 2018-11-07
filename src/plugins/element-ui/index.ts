import { VueConstructor } from "vue";
import ElementTreeTable from "@/components/tree-table/index.vue";
import "element-ui/lib/theme-chalk/reset.css";

import {
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tooltip,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  RadioButton,
  Dialog,
  MessageBox,
  Message,
  Table,
  TableColumn,
  Pagination,
  Switch,
  Loading,
  Tree,
  Select,
  Option,
  Radio,
  Tag,
  InputNumber,
} from "element-ui";

export default (Vue: VueConstructor) => {
  // @ts-ignore
  Vue.component(ElementTreeTable.name, ElementTreeTable);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Input.name, Input);
  Vue.component(Button.name, Button);
  Vue.component(Menu.name, Menu);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(MenuItemGroup.name, MenuItemGroup);
  Vue.component(Submenu.name, Submenu);
  Vue.component(Tooltip.name, Tooltip);
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
  Vue.component(RadioGroup.name, RadioGroup);
  Vue.component(RadioButton.name, RadioButton);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
  Vue.component(Pagination.name, Pagination);
  Vue.component(Switch.name, Switch);
  Vue.component(Tree.name, Tree);
  Vue.component(Select.name, Select);
  Vue.component(Option.name, Option);
  Vue.component(Radio.name, Radio);
  Vue.component(Tag.name, Tag);
  Vue.component(InputNumber.name, InputNumber);


  Vue.directive("loading", Loading.directive);

  // @ts-ignore
  Vue.prototype.$message = Message;
  // @ts-ignore
  Vue.prototype.$msgbox = (...args) => MessageBox(...args);
  // @ts-ignore
  Vue.prototype.$confirm = (...args) => MessageBox.confirm(...args);
  // @ts-ignore
  Vue.prototype.$alert = (...args) => MessageBox.alert(...args);
  // @ts-ignore
  Vue.prototype.$prompt = (...args) => MessageBox.prompt(...args);
};
