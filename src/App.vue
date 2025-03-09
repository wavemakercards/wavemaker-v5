<script>
import { store } from "@/store/store.js";
import TopToolbar from '@/components/TopToolbar.vue';
import FooterBar from '@/components/FooterBar.vue';
import InstallPopup from '@/components/InstallPopup.vue';
import DexieDB from "@/assets/DexieDB.js";
import templateObjects from "@/assets/templateObjects.js";
import Welcome from '@/components/Welcome.vue';
import ApplicationSections from '@/components/ApplicationSections.vue';
export default {
  mixins: [DexieDB,templateObjects],
  components: {
    TopToolbar,
    InstallPopup,
    FooterBar,
    ApplicationSections,
    Welcome
  },
  data() {
    return {
      store,
    };
  },
  methods: {

  },
 mounted() {
    if ("launchQueue" in window && "files" in window.LaunchParams.prototype) {
        window.launchQueue.setConsumer(async (launchParams) => {
          if (!launchParams.files.length) {
            return;
          }
          this.store.fileHandle = launchParams.files[0];
          const file = await this.store.fileHandle.getFile();
          const contents = await file.text();
          this.store.jsonData = JSON.parse(contents);
          await this.$root.dbImport(this.store.jsonData);
        });
      }
      this.$root.initDatabase()
  },
};
</script>

<template>
  <div id="app">
    <TopToolbar />
     <div class="container">
      <Welcome v-if="!$root.dbRef" />
      <ApplicationSections v-else />
    </div>
    <FooterBar />
  </div>
  <InstallPopup />
</template>
