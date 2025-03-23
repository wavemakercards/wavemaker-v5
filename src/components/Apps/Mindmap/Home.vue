<script>
import MindmapEditor from '@/components/Apps/Mindmap/MindmapEditor.vue';
export default {
  name: "MindmapHome",
  components:{
    MindmapEditor
  }
};
</script>

<template>
  <div v-if="!$root.tools.mindmap.selected">
    <button @click="$root.makeMindmap('', '')">Add</button>
    <div v-for="(item, i) in this.$root.syncdb.Mindmap">
      <button @click="$root.tools.mindmap.selected = item">
        {{ item.title }}
      </button>
    </div>
  </div>

  <div v-if="$root.tools.mindmap.selected">
    <MindmapEditor />
  </div>

</template>

<style scoped></style>
