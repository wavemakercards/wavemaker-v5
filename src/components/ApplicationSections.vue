<template>
  <div>
    <h1>Applications Here</h1>
    <p>This is the About page.</p>
    <pre>hi {{ this.$root.syncdb  }}</pre>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      Settings: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Settings.get(obj.uuid))),
    };
  },
};
</script>
