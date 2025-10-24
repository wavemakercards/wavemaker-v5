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
  components: {
    WelcomeScreen,
    TopToolBar,
    SideToolBar,
    MainArea,
    RightSidePanel,
    LeftSidePanel,
  },
   data() {
    return {
            store,
      modal : null,
      currentTool: null,
      urlSelected : null,
      FileManager: {
        fileHandle: null,
        jsonData: null,
      },
      tools: {
        current: null,
        writer: {
          selected: null,
          selectednode: null,
          mybook: null,
        },
        cards :{
          searchterms : null,
          selected : null
        },
        gridplanner: {
          selected: null,
        },
        timeline: {
          selected: null,
        },
        snowflake: {
          selected: null,
        },
        mindmap: {
          selected: null,
        },
        planningboard: {
          selected: null,
        },
      },
    };
  },
  created() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // Notify the user about the update
                  const updateNotification = confirm(
                    "A new version of the app is available. Would you like to update?"
                  );
                  if (updateNotification) {
                    window.location.reload();
                  }
                }
              }
            };
          }
        };
      });
    }
  },
};
</script>

<template>
  <WelcomeScreen v-if="!$root.dbRef" />
  <template v-if="$root.dbRef">
    <TopToolBar v-if="$root.toolbarheight"/>
    <SideToolBar />
    <MainArea />
    <LeftSidePanel />
    <RightSidePanel />
  </template>
</template>

<style></style>
