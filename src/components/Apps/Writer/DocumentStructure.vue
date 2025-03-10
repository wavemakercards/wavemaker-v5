<template>
    <button @click="newFolder" class="new-button" >
          <span style="width: 1rem; height: 1rem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span> New Folder </span>
        </button>

        <VueTreeDnd
          :component="TreeItemRenderer"
          :locked="locked"
          v-model="tree"
          @move="onMove"
        />
</template>
  
<script setup lang="ts">
import { ref, provide } from "vue";
import VueTreeDnd, {
  MoveMutation,
  TreeItem,
  TreeItemId,
} from "vue-tree-dnd";
import TreeItemRenderer from "./Tree/TreeItemRenderer.vue";
import { deleteNodeFromTree, moveMutation } from "./Tree/tree-helper";
import { getRandomName } from "./Tree/naming-helper";
import { v4 as uuid } from "uuid";

const tree = ref<TreeItem[]>([]);
const locked = ref<boolean>(false);

const onMove = (event: MoveMutation) => {
  tree.value = moveMutation(tree.value, event);
};

const newFolder = () => {
  const name = getRandomName();
  const newNode = {
    id: uuid(),
    name: name,
    expanded: true,
    children: [],
  };
  tree.value = [...tree.value, newNode];
};

provide("delete", (id: TreeItemId) => {
      "Are you sure you want to delete this item?"
    );
    if (!areYouSure) return;
    tree.value = deleteNodeFromTree(tree.value, id);
  });
  </script>
  
  <style scoped>
 .new-button{
    position: sticky;
    top:0px;
    width: 100%;
    background-color: var(--accent2);
    border: 0px;
 }

 .new-button:hover{
        background-color: var(--accent2);
 }
 .new-button svg{
    width: 25px;
 }  </style>
  