<script>
export default {
  methods: {
    update(){
      this.$root.UpdateRecord("Settings", this.$root.syncdb.Settings.uuid, this.$root.syncdb.Settings) 
    }
  }
};
</script>

<template>
  <span v-if="this.$root.syncdb.Settings">
     <input type="text" v-model="this.$root.syncdb.Settings.ProjectName" placeholder="Project Name" @blur="update()" />
  </span>
</template>
