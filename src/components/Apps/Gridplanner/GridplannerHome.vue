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
  <div v-if="!$root.tools.gridplanner.selected" class="gridplanners">


      <button @click="$root.tools.gridplanner.selected = item"  v-for="(item, i) in this.$root.syncdb.Gridplanner">
        <svg class="icon" viewBox="0 0 24 24">
          <title>view-grid</title>
          <path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
          </svg>
        <div>{{ item.title }}</div>
      </button>
      <button @click="$root.makeGridplanner()" class="add">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>
        <div>Add</div></button>

  </div>

  <div v-if="$root.tools.gridplanner.selected">
    <GridplannerEditor />
  </div>

</template>

<style scoped>

.gridplanners {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.gridplanners button {
  padding: 10px;
  background-color: var(--accent2);
  color:#fff;
  fill:#fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  height: 150px;
  border: 1px solid #ffffff00;
}

.gridplanners button:hover {
  background-color: #e0e0e0;
  color: #000;
  border: 4px solid #ffffffff;
}
.gridplanners button .icon{
  width:50px;
  height:50px;
}
button.add{
  background-color: var(--accent6);
  font-size: 24px;
}
</style>
