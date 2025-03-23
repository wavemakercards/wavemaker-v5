<script>

export default {
  name: 'CardsdatabaseHome',
  components: {

  },
  methods: {
  }
};
</script>

<template>
  
<div>
  Cardsdatabase
</div>
  <pre>
    {{ $root.syncdb.Cards }}
  </pre>
</template>

<style scoped>

</style>