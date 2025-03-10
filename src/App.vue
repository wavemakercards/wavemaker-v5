<script>
import { store } from "@/store/store.js";

/** Mixins */
import DexieDB from "@/mixins/DexieDB.js";
import templateObjects from "@/mixins/templateObjects.js";
import fileManager from "@/mixins/fileManager.js";
import windowManager from "@/mixins/windowManager.js";

/** Components */
import TopToolbar from '@/components/InterfaceElements/TopToolbar.vue';
import FooterBar from '@/components/InterfaceElements/FooterBar.vue';
import InstallPopup from '@/components/InterfaceElements/InstallPopup.vue';
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
      currentTool: null,
      node : 0
    };
  },
  methods: {
 
  }
};
</script>

<template>
  <div id="app">
    <TopToolbar     v-if="$root.mainwindow"/>
     <div class="container" :class="{ 'mainwindow': $root.mainwindow }">
      <Welcome v-if="!$root.dbRef" />
      <ApplicationSections v-else />
    </div>
    <FooterBar     v-if="$root.mainwindow" />
  </div>
  <InstallPopup />
</template>
