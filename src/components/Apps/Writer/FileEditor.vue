<script>
import FileName from "@/components/FormComponents/FileName.vue";
export default {
  components: {
    FileName,
  },
  methods: {
    handleChange(event) {
      //  this.$root.UpdateRecord("Writer", this.$root.tools.writer.selected, this.$root.tools.writer.mybook);
    },
  },
  name: "FileEditor",
  data() {
    return {
      myfile: null,
    };
  },
  async mounted() {
    this.myfile = await this.$root.useObservable(
      this.$root.liveQuery(
        async () =>
          await this.$root.db.Files.get(this.$root.tools.writer.selectednode)
      )
    );
  },
};
</script>

<template>
  <div class="subbar">
    <FileName
      :myuuid="$root.tools.writer.selectednode"
      :key="$root.tools.writer.selectednode"
      :formmode="true"
    />
  </div>

  {{ myfile }}
</template>

<style scoped></style>
