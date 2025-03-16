<script>
import autosize from "@/directives/autosize.js";
export default {
  directives: {
    autosize
  },
  components: {},
  methods: {
    handleChange() {
      this.$root.UpdateRecord(
        "Writer",
        this.$root.tools.writer.selected,
        this.mybook
      );
    },
  },
  name: "BookEditor",
  data() {
    return {
      mybook: null,
    };
  },
  async mounted() {
    this.mybook = await this.$root.useObservable(
      this.$root.liveQuery(
        async () =>
          await this.$root.db.Writer.get(this.$root.tools.writer.selected)
      )
    );
  },
};
</script>

<template>
      <div class="subbar">
Anv options here?
  </div>
    <div v-if="mybook" class="infocontainer">

  <label>Book Title</label>

  <div class="formholder">
    <input
    
type="text"
v-model="mybook.title"
@blur="handleChange"
/>

  </div>


  <label>Author</label>
  <div class="formholder">
    <input
      type="text"
      v-model="mybook.author"
      @blur="handleChange"
    />
  </div>
  <label>Description+</label>
  <div class="formholder">
    <textarea v-autosize v-model="mybook.description" />
  </div>
  {{ mybook }}
</div>
</template>

<style scoped>
.infocontainer{
    margin:0 auto;
    max-width: 700px;
    padding: 10px;
}
</style>
