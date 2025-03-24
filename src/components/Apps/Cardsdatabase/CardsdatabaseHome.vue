<script>
import CardViewer from '@/components/Apps/Cardsdatabase/CardViewer.vue';
export default {
  name: 'CardsdatabaseHome',
  components: {
    CardViewer
  },
  computed:{
    filteredCardList(){
      /**
       * TODO : add in sort/filter tools
       */
      return this.$root.syncdb.Cards
    }
  },
  methods: {
  }
};
</script>

<template>
<div>
  <button class="btn" @click="$root.makeNewCard()" >
        <svg class="icon" viewBox="0 0 24 24"><path d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z"></path></svg>
        <span>NEW</span>
  </button>
</div>
<div class="masonry-grid">
  <CardViewer v-for="(card, index) in filteredCardList" :key="card.uuid" :cardRef="card.uuid" class="masonry-item"/>
</div>
</template>

<style scoped>
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 6px;
  padding: 10px;
}

.masonry-item {
  break-inside: avoid;
}
</style>