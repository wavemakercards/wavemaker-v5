<script>
/** Mixins */
import DexieDB from "@/mixins/DexieDB.js";
import templateObjects from "@/mixins/templateObjects.js";
import fileManager from "@/mixins/fileManager.js";
import windowManager from "@/mixins/windowManager.js";

/** Components */
import TopToolbar from "@/components/InterfaceElements/TopToolbar.vue";
import ModalManager from "@/components/InterfaceElements/ModalManager.vue";
import FooterBar from "@/components/InterfaceElements/FooterBar.vue";
import InstallPopup from "@/components/InterfaceElements/InstallPopup.vue";
import Welcome from "@/components/Welcome.vue";
import ApplicationSections from "@/components/ApplicationSections.vue";

export default {
  mixins: [DexieDB, templateObjects, fileManager, windowManager],
  components: {
    TopToolbar,
    ModalManager,
    InstallPopup,
    FooterBar,
    ApplicationSections,
    Welcome,
  },
  data() {
    return {
      modal : null,
      currentTool: null,
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
      navigator.serviceWorker.register("/sw.js").then((registration) => {
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
  methods: {},
};
</script>

<template>
  <div id="app">
    <TopToolbar v-if="$root.mainwindow" />
    <div class="container" :class="{ mainwindow: $root.mainwindow }">
      <Welcome v-if="!$root.dbRef" />
      <ApplicationSections v-else />
    </div>
    <FooterBar v-if="$root.mainwindow" />
  </div>
  <ModalManager v-if="$root.modal" />
  <InstallPopup />
</template>
