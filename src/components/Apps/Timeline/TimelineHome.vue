<script>
import TimelineEditor from '@/components/Apps/Timeline/TimelineEditor.vue';
export default {
  name: "TimelineHome",
  components:{
    TimelineEditor
  }
};
</script>

<template>
  <div v-if="!$root.tools.timeline.selected" class="timelines">


      <button @click="$root.tools.timeline.selected = item"  v-for="(item, i) in this.$root.syncdb.Timeline">
        <svg class="icon" viewBox="0 0 24 24">
          <title>timeline-outline</title>
          <path
            d="M4 2V8H2V2H4M2 22V16H4V22H2M5 12C5 13.11 4.11 14 3 14C1.9 14 1 13.11 1 12C1 10.9 1.9 10 3 10C4.11 10 5 10.9 5 12M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M10 6V18H22V6H10Z"
          />
          </svg>
        <div>{{ item.title }}</div>
      </button>
      <button @click="$root.makeTimeline()" class="add">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>
        <div>Add</div></button>

  </div>

  <div v-if="$root.tools.timeline.selected">
    <TimelineEditor />
  </div>

</template>

<style scoped>

.timelines {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.timelines button {
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

.timelines button:hover {
  background-color: #e0e0e0;
  color: #000;
  border: 4px solid #ffffffff;
}
.timelines button .icon{
  width:50px;
  height:50px;
}
button.add{
  background-color: var(--accent6);
  font-size: 24px;
}
</style>
