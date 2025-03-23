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
  Cardsdatabase
</div>
<CardViewer v-for="(card, index) in filteredCardList" :key="card.uuid" :cardRef="card.uuid"/>
</template>

<style scoped>

</style>