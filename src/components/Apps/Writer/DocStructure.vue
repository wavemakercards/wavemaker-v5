<template>
  <div class="documentStructure" v-if="this.$root.tools.writer.mybook">
    <div class="lhstools">
      <button @click="addNode" class="btn" >
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>Add File</title>
          <path
            d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H13.81C13.28 21.09 13 20.05 13 19C13 15.69 15.69 13 19 13C19.34 13 19.67 13.03 20 13.08V8L14 2M13 9V3.5L18.5 9H13M23 20H20V23H18V20H15V18H18V15H20V18H23V20Z"
          />
        </svg>
        Add
      </button>
    </div>
    <div>
      <div class="docsettings">
      <button
        class="btn"
        @click="$root.tools.writer.selectednode = null"
      >
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>book-open-page-variant-outline</title>
          <path
            d="M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z"
          />
        </svg>
        Document Settings
      </button>
    </div>
      <div style="padding: 10px">
        <div class="lhsscrollcontainer">
          <DocStructureNode
            v-if="this.$root.tools.writer.mybook.files.length"
            v-model="this.$root.tools.writer.mybook.files"
          />
        </div>
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
  height: 34px;
  background-color: inherit;
  text-align: right;
}

.lhsscrollcontainer {
  overflow: auto;
  position: absolute;
  top: 70px;
  left: 0px;
  right: 30px;
  bottom: 0px;
  padding: 10px 10px 50px 10px;

}
.lhshidden .lhsscrollcontainer{
  overflow: hidden;
}
.docsettings {
  position: sticky;
  top: 30px;
  color: currentColor;
  border: 0px;
  width: 320px;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
  background-color: inherit;
  margin:5px
}


</style>
