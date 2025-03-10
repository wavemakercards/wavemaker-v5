<template>
  <div class="tree-item" :style="{ paddingLeft: depth * 2 + 0.5 + 'rem' }">
    <template v-if="item?.children && item.children.length > 0">
      <a href="#" @click="setExpanded(!expanded)">
        <DownChevron v-if="expanded" />
        <RightChevronIcon v-else />
      </a>
    </template>
    <template v-else>
      <a href="#" style="color: #aaa" disabled="true">
        <DownChevron v-if="expanded" />
        <RightChevronIcon v-else />
      </a>
    </template>
    <div class="main"><input type="text" v-model="item.name" ></div>
    <div class="action-button">
      <a href="#" @click="tryDelete(item?.id)" class="delete-button"
        ><TrashIcon
      /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import RightChevronIcon from "./RightChevronIcon.vue";
import DownChevron from "./DownChevronIcon.vue";
import TrashIcon from "./TrashIcon.vue";
import { inject } from "vue";
import { TreeItemId } from "vue-tree-dnd";
defineProps({
  item: Object,
  depth: {
    type: Number,
    required: true,
  },
  expanded: Boolean,
});
const emit = defineEmits(["setExpanded"]);
const setExpanded = (expanded: boolean) => emit("setExpanded", expanded);

const deleteNode = inject<(id: TreeItemId) => void>("delete");
const tryDelete = (id: TreeItemId | undefined) => {
  if (deleteNode && id) {
    deleteNode(id);
  }
};
</script>

<style scoped>
.tree-item {
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.4rem 1rem;
}
.tree-item:hover {
  background-color: var(--accent2);
}
.tree-item:hover .action-button {
  display: inherit;
}

.main {
  flex-grow: 1;
  padding: 0 0.5rem;
  text-align: left;
  font-weight: bold;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #000;
  margin-right: 0.5rem;
  border: 1px solid #aaa;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 0.5rem;
}
a:hover {
  background-color: #ccc;
}
a:active {
  background-color: #aaa;
}

.action-button {
  display: none;
}
.delete-button:hover {
  border-color: #833;
  color: #833;
  background-color: #faa;
}
.delete-button:active {
  background-color: #c33;
}
</style>
