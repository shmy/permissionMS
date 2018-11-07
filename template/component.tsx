import { Component, Vue } from "vue-property-decorator";
import { CreateElement } from "vue";

@Component({
  name: "name",
  components: {
    // todo
  },
})
export default class extends Vue {
  render(h: CreateElement) {
    return (
      <div>component</div>
    );
  }
  created() {
    // todo
  }
  mounted() {
    // todo
  }

}
