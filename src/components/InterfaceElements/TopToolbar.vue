<script>
import Logo from "@/components/InterfaceElements/Logo.vue";
import ToolMenu from "@/components/InterfaceElements/ToolMenu.vue";
export default {
  components: {
    Logo,ToolMenu
  },
  methods: {},
};
</script>

<template>
  <div id="TopToolBar">
    <span>
      <button  class="toptoolbarbutton" @click="$root.currentTool = null">
        <Logo  />
      </button>
        <ToolMenu class="toolmenu" />
    </span>

    <span class="floatRight">
      <button  class="toptoolbarbutton" @click="$root.openFileFromGoogleDrive" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Google Drive</title>
          <path
            d="M7.71,3.5L1.15,15L4.58,21L11.13,9.5M9.73,15L6.3,21H19.42L22.85,15M22.28,14L15.42,2H8.58L8.57,2L15.43,14H22.28Z"
          />
        </svg>
      </button>

      <button  class="toptoolbarbutton" @click="$root.openFileFromDropBox" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Dropbox</title>
          <path
            d="M3 6.2L8 9.39L13 6.2L8 3L3 6.2M13 6.2L18 9.39L23 6.2L18 3L13 6.2M3 12.55L8 15.74L13 12.55L8 9.35L3 12.55M18 9.35L13 12.55L18 15.74L23 12.55L18 9.35M8.03 16.8L13.04 20L18.04 16.8L13.04 13.61L8.03 16.8Z"
          />
        </svg>
      </button>

      <button  class="toptoolbarbutton" @click="$root.openFile()" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Load your Project</title>
          <path
            d="M20 18H4V8H20M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M16 17H14V13H11L15 9L19 13H16Z"
          />
        </svg>
      </button>
      <span v-if="$root.dbRef">
        <button  class="toptoolbarbutton" title="Open in a new window" @click="$root.openNewWindow()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Open New Window</title>
            <path
              d="M12,10L8,14H11V20H13V14H16M19,4H5C3.89,4 3,4.9 3,6V18A2,2 0 0,0 5,20H9V18H5V8H19V18H15V20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4Z"
            />
          </svg>
        </button>

        <button  class="toptoolbarbutton" @click="$root.snapShot()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Snapshot Project</title>
            <path
              d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"
            />
          </svg>
        </button>

        <button  class="toptoolbarbutton" @click="$root.saveFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Save Project</title>
            <path
              d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"
            />
          </svg>
        </button>
        <button  class="toptoolbarbutton" @click="$root.clearFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Close Project</title>
            <path
              d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z"
            />
          </svg>
        </button>
      </span>
    </span>
  </div>
</template>

<style scoped>
#TopToolBar {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  height: 40px;
  padding: 5px 5px 0px 5px;
  background-color: var(--bg2);
  display: flex;
  flex-direction: row;
  align-items: top;
    justify-content: space-between;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s, transform 0.7s;
}



@media (max-width: 500px) {
  .toolmenu {
    display: none !important;
  }
}
</style>
