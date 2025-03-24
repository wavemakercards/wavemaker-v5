<script>
import SnowflakeEditor from '@/components/Apps/Snowflake/SnowflakeEditor.vue';
export default {
  name: "SnowflakeHome",
  components:{
    SnowflakeEditor
  }
};
</script>

<template>
  <div v-if="!$root.tools.snowflake.selected">
    <button @click="$root.makeSnowflake()">Add</button>
    <div v-for="(item, i) in this.$root.syncdb.Snowflake">
      <button @click="$root.tools.snowflake.selected = item">
        {{ item.title }}
      </button>
    </div>
  </div>

  <div v-if="$root.tools.snowflake.selected">
    <SnowflakeEditor />
  </div>

</template>

<style scoped></style>
