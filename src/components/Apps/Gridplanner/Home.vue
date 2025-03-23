<script>
import GridplannerEditor from '@/components/Apps/Gridplanner/GridplannerEditor.vue';
export default {
  name: "GridplannerHome",
  components:{
    GridplannerEditor
  }
};
</script>

<template>
  <div v-if="!$root.tools.gridplanner.selected">
    <button @click="$root.makeGridplanner()">Add</button>
    <div v-for="(item, i) in this.$root.syncdb.Gridplanner">
      <button @click="$root.tools.gridplanner.selected = item">
        {{ item.title }}
      </button>
    </div>
  </div>

  <div v-if="$root.tools.gridplanner.selected">
    <GridplannerEditor />
  </div>

</template>

<style scoped></style>
