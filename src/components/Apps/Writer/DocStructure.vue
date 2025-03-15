<template>
  <div class="documentStructure">
    <div class="lhstools">
      <button @click="addNode">Add</button>
    </div>
    <DocStructureNode :files="list" />
  </div>  
</template>

<script>
import DocStructureNode from "@/components/Apps/Writer/DocStructureNode.vue";
import { store } from "@/store/store.js";
export default {
  name: "DocStructure",
  components: {
    DocStructureNode
  },
  data() {
    return {
      store,
      list: [
        {
          name: "task 1",
          type:"folder",
          files: [
            {
              name: "task 2",
              type:"folder",
              files: []
            }
          ]
        },
        {
          name: "task 3",
          type:"folder",
          files: [
            {
              name: "task 4",
              type:"folder",
              files: []
            }
          ]
        },
        {
          name: "task 5",
          type:"folder",
          files: []
        }
      ]
    };
  },
  methods:{
    addNode(){
      let node = {}
      node.name = "New"
      node.type= "folder"
      node.files = []
      if(!this.store.tools.writer.selectednode){
        this.list.push(node)
      }else{
        this.store.tools.writer.selectednode.open = true
        this.store.tools.writer.selectednode.files.push(node)
      }
    }

  }
};
</script>

<style lang="css" scoped>
.lhstools{
  background-color: var(--accent6);
  padding: 5px;
  position: sticky;
  top:0px;
}
</style>
