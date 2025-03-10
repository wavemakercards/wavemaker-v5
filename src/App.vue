<script>
import { store } from "@/store/store.js";

/** Mixins */
import DexieDB from "@/assets/DexieDB.js";
import templateObjects from "@/assets/templateObjects.js";
import fileManager from "@/assets/fileManager.js";
import windowManager from "@/assets/windowManager.js";

/** Components */
import TopToolbar from '@/components/TopToolbar.vue';
import FooterBar from '@/components/FooterBar.vue';
import InstallPopup from '@/components/InstallPopup.vue';
import Welcome from '@/components/Welcome.vue';
import ApplicationSections from '@/components/ApplicationSections.vue';


export default {
  mixins: [DexieDB,templateObjects,fileManager,windowManager],
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
 
  }
};
</script>

<template>
  <div id="app">
    <TopToolbar v-if="!$root.ParentWindow"/>
     <div class="container">
      <Welcome v-if="!$root.dbRef" />
      <ApplicationSections v-else />
    </div>
    <FooterBar v-if="!$root.ParentWindow" />
  </div>
  <InstallPopup />
</template>
