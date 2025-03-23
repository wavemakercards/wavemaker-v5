<script>
export default {
  name: "MindmapHome",
  data() {
    return {};
  },
  methods: {
    async update() {
      await this.$root.UpdateRecord(
        "Mindmap",
        this.$root.tools.mindmap.selected.uuid,
        this.$root.tools.mindmap.selected
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
      v-model="$root.tools.mindmap.selected.title"
    />
    <button @click="$root.tools.mindmap.selected = null">close</button>
  </div>

  <div>
    OK mindmap needs to go here
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
