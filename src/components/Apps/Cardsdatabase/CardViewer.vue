<script>
export default {
  name: "CardViewer",
  components: {},
  props: {
    cardRef: {
      type: String
    },
  },
  methods: {
    
  },
};
</script>

<template>
    <div v-if="!cardRef">
        No card ref provided so we need to have the "create" or "link" option
    </div>
    <div v-if="cardRef">
        <div>{{ $root.syncdb.Cards[cardRef].title }}</div>
        <div>{{ $root.syncdb.Cards[cardRef].description }}</div>
    </div>
</template>

<style scoped></style>
