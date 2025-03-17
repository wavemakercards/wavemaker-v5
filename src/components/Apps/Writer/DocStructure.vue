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
        Document Settings
      </button>
      <div style="padding: 10px;">
      <DocStructureNode
        v-if="this.$root.tools.writer.mybook.files.length"
        v-model="this.$root.tools.writer.mybook.files"
      />
    </div>
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
  padding: 3px;
  position: sticky;
  top: 0px;
  height: 30px;
  background-color: var(--bg2);
  text-align: right;
}
.lhstools button{
  background: none;
  border: 1px solid #323232;
  border-radius: 5px;
  color: currentColor;
  cursor: pointer;
  height: 24px;
  text-align: right;
}
.lhstools button:hover{
  background-color: #00000044;
}

.docsettings {
  position: sticky;
  top: 30px;
  padding: 5px;
  background:none; 
  color: currentColor;
  border: 0px;
  width: 320px;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
  border-bottom: 1px solid  #666;
  background-color: var(--bg2);
}
</style>
