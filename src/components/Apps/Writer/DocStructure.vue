<template>
  <div class="documentStructure" v-if="this.$root.tools.writer.mybook">
    <div class="lhstools">
      <button @click="addNode">Add</button>
    </div>
    <div>
      <button
        class="docsettings"
        @click="$root.tools.writer.selectednode = null"
      >
        {{ this.$root.tools.writer.mybook.title }}
      </button>
      <DocStructureNode
        v-if="this.$root.tools.writer.mybook.files.length"
        v-model="this.$root.tools.writer.mybook.files"
      />
    </div>
  </div>
</template>

<script>
import DocStructureNode from "@/components/Apps/Writer/DocStructureNode.vue";
export default {
  name: "DocStructure",
  components: {
    DocStructureNode,
  },
  data() {
    return {
      bookwatch: null,
    };
  },
  async mounted() {
    // this.mybook = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Writer.get(this.$root.tools.writer.selected)))
    this.bookwatch = await this.$root.useObservable(
      this.$root.liveQuery(
        async () =>
          await this.$root.db.Writer.get(this.$root.tools.writer.selected)
      )
    );
    this.$watch("bookwatch", (newVal, oldVal) => {
      // Do something when bookwatch changes
      console.log("bookwatch changed:", newVal, oldVal);
      this.$root.tools.writer.mybook = JSON.parse(JSON.stringify(newVal));
      // You can add more logic here
    });
  },
  methods: {
    async addNode() {
      // create new file node in the thingy
      let template = JSON.parse(JSON.stringify(this.$root.fileTemplate));
      template.writerid = this.$root.tools.writer.selected;
      template.uuid = this.$root.uuid();
      await this.$root.AddRecord("Files", template);

      let node = {};
      node.open = false;
      node.uuid = template.uuid;
      node.files = [];

      let addto = null;
      if (!this.$root.tools.writer.selectednode) {
        addto = this.$root.tools.writer.mybook;
      } else {
        addto = this.findNodeByUUID(
          this.$root.tools.writer.selectednode,
          this.$root.tools.writer.mybook
        );
      }
      addto.files.push(node);
      addto.open = true;

      this.$root.UpdateRecord(
        "Writer",
        this.$root.tools.writer.selected,
        this.$root.tools.writer.mybook
      );
    },
    findNodeByUUID(uuid, node) {
      if (node.uuid === uuid) {
        return node;
      }
      for (let file of node.files) {
        let found = this.findNodeByUUID(uuid, file);
        if (found) {
          return found;
        }
      }
      return null;
    },
  },
};
</script>

<style lang="css" scoped>
.lhstools {
  background-color: #212121;
  padding: 5px;
  position: sticky;
  top: 0px;
}

.docsettings {
  position: sticky;
  top: 30px;
  padding: 5px;
  background-color: var(--accent5);
  color: currentColor;
  border: 0px;
  width: 320px;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
}
</style>
