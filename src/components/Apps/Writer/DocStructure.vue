<script>
import { ref } from "vue";
import VueTreeDnd from "vue-tree-dnd";
import DocStructureNode from "@/components/Apps/Writer/DocStructureNode.vue";
import { v4 as uuid } from "uuid";
import { store } from "@/store/store.js";
export default {
  name: "DocStructureNode",
  components: {
    VueTreeDnd,
    DocStructureNode,
  },
  setup() {
    let updatecounter = ref(0); // Declare updatecounter as a ref
    
    const tree = ref([
      {
        id: 1,
        name: "Root",
        expanded: true,
        children: [
          {
            id: 2,
            name: "Item 2.1",
            expanded: true,
            children: [
              {
                id: 3,
                name: "Item 3.1",
                expanded: true,
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: "Item 2.2",
            expanded: true,
            children: [
              {
                id: 5,
                name: "Item 3.2",
                expanded: true,
                children: [],
              },
            ],
          },
          {
            id: 6,
            name: "Item 2.3",
            expanded: true,
            children: [
              {
                id: 7,
                name: "Item 3.3",
                expanded: true,
                children: [],
              },
            ],
          },
          {
            id: 8,
            name: "Item 2.4",
            expanded: true,
            children: [
              {
                id: 9,
                name: "Item 3.4",
                expanded: true,
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  
    const addHandler = () => {
      const id = uuid();
      const node = {
        id,
        name: `${id}`,
        expanded: true,
        children: [],
      };
      console.log(node);
      store.currentNode.children.push(node);
      updatecounter++; // Increment updatecounter
    };

    const moveHandler = (event) => {
      const { id, targetId, position } = event;
      const findNode = (nodes, id) => {
        for (let node of nodes) {
          if (node.id === id) return node;
          if (node.children) {
            const found = findNode(node.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const removeNode = (nodes, id) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            return nodes.splice(i, 1)[0];
          }
          if (nodes[i].children) {
            const removed = removeNode(nodes[i].children, id);
            if (removed) return removed;
          }
        }
        return null;
      };

      const insertNode = (nodes, targetId, node, position) => {
        for (let targetNode of nodes) {
          if (targetNode.id === targetId) {
            if (position === "FIRST_CHILD") {
              targetNode.children.unshift(node);
            } else if (position === "LAST_CHILD") {
              targetNode.children.push(node);
            } else if (position === "LEFT") {
              const index = nodes.indexOf(targetNode);
              nodes.splice(index, 0, node);
            } else if (position === "RIGHT") {
              const index = nodes.indexOf(targetNode);
              nodes.splice(index + 1, 0, node);
            }
            return;
          }
          if (targetNode.children) {
            insertNode(targetNode.children, targetId, node, position);
          }
        }
      };

      const node = removeNode(tree.value, id);
      if (node) {
        insertNode(tree.value, targetId, node, position);
      }
    };

    return {
      tree,
      store,
      updatecounter,
      moveHandler,
      addHandler,
      DocStructureNode,
    };
  },
};
</script>

<template>
  <div class="filescroller">
    <div class="tools">
      <button @click="addHandler">Add</button>
      Node{{ store.currentNode }}</div>
    <VueTreeDnd
    :key="updatecounter"
      :component="DocStructureNode"
      v-model="tree"
      @move="moveHandler"
    />
  </div>
</template>

<style scoped>
.filescroller {
  position: absolute;

  top: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  overflow-y: auto;
}

.filescroller .tools {
  position: sticky;
  top:0px;
}
</style>