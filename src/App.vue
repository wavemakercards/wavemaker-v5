<script>
/** Mixins */
import DexieDB from "@/mixins/DexieDB.js";
import templateObjects from "@/mixins/templateObjects.js";
import fileManager from "@/mixins/fileManager.js";
import windowManager from "@/mixins/windowManager.js";

import TopToolBar from "@/components/interface/TopToolBar.vue";
import SideToolBar from "@/components/interface/SideToolBar.vue";
import MainArea from "@/components/interface/MainArea.vue";
import RightSidePanel from "@/components/interface/RightSidePanel.vue";
import LeftSidePanel from "@/components/interface/LeftSidePanel.vue";
import WelcomeScreen from "@/components/WelcomeScreen.vue";
import { store } from "@/store/store";
export default {
  mixins: [DexieDB, templateObjects, fileManager, windowManager],
  data() {
    return {
      store,
    };
  },
  components: {
    WelcomeScreen,
    TopToolBar,
    SideToolBar,
    MainArea,
    RightSidePanel,
    LeftSidePanel,
  },
};
</script>

<template>
  <WelcomeScreen v-if="!store.isProjectLoaded" />
  <template v-if="store.isProjectLoaded">
    <TopToolBar />
    <SideToolBar />
    <MainArea />
    <LeftSidePanel />
    <RightSidePanel />
  </template>
</template>

<style></style>
