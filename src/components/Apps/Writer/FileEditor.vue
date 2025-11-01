<script>
import FileName from "@/components/FormComponents/FileName.vue";
import TipTap from "@/components/FormComponents/TipTap.vue";
export default {
  components: {
    FileName,
    TipTap
  },
  methods: {

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
  <div style="text-align: center;">
    <FileName
      :myuuid="$root.tools.writer.selectednode"
      :key="$root.tools.writer.selectednode"
      :formmode="true"
    />
  </div>
  <TipTap v-if="myfile" :file="myfile"  :key="myfile.lastupdated"/>
</template>


