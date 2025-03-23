<script>
export default {
  name: "GridplannerEditor",
  data() {
    return {};
  },
  methods: {
    async update() {
      await this.$root.UpdateRecord(
        "Gridplanner",
        this.$root.tools.gridplanner.selected.uuid,
        this.$root.tools.gridplanner.selected
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
      v-model="$root.tools.gridplanner.selected.title"
    />
    <button @click="$root.tools.gridplanner.selected = null">close</button>
  </div>

  <div>
    OK gridplanner needs to go here
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
