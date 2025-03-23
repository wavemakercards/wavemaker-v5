<script>
export default {
  name: "SnowflakeEditor",
  data() {
    return {};
  },
  methods: {
    async update() {
      await this.$root.UpdateRecord(
        "Snowflake",
        this.$root.tools.snowflake.selected.uuid,
        this.$root.tools.snowflake.selected
      );
    },
  },
};
</script>

<template>
  <div class="flexcol">
    <input
      @blur="update()"
      type="text"
      v-model="$root.tools.snowflake.selected.title"
    />
    <button @click="$root.tools.snowflake.selected = null">close</button>
  </div>

  <div>
    OK snowflake needs to go here
  </div>
</template>

<style scoped>
.flexcol {
  display: flex;
  flex-direction: row;
}
input {
  width: 320px;
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
}
</style>
