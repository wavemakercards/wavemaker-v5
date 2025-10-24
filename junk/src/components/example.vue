<template>
  <div>
    <h1>Applications Here</h1>
    <p>This is the About page.</p>
    <input type="text" v-model="this.$root.syncdb.Settings.ProjectName" @blur="update()" />
    <pre>hi {{ this.$root.syncdb }}</pre>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {
    update(){
      this.$root.UpdateRecord("Settings", this.$root.syncdb.Settings.uuid, this.$root.syncdb.Settings) 
    }
  }
};
</script>
