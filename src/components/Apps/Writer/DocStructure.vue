<template>
  <div class="documentStructure">
    <div class="lhstools">
      <button @click="addNode">Add</button>
    </div>


    <DocStructureNode :files="$root.syncdb.Writer[$root.tools.writer.selected].files" />
  </div>  
</template>

<script>
/**
 * ToDO - the document structure here is going to be more like WM3 - nested chunks with children
 * 
 */

import DocStructureNode from "@/components/Apps/Writer/DocStructureNode.vue";
export default {
  name: "DocStructure",
  components: {
    DocStructureNode
  },
  data() {
    return {

    };
  },
  methods:{
    addNode(){
      let node = {}
      node.name = "New"
      node.type= "folder"
      node.files = []
      if(!this.$root.tools.writer.selectednode){
        this.list.push(node)
      }else{
        this.$root.tools.writer.selectednode.open = true
        this.$root.tools.writer.selectednode.files.push(node)
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
