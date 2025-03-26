<script>
import Logo from "@/components/InterfaceElements/Logo.vue";

export default {
  components: {
    Logo,

  },
  methods: {},
};
</script>

<template>
  <div class="toptoolbar">
    <div>
    <button @click="$root.currentTool = null" class="titlebtn">
      <Logo style="width: 30px; height: 30px" />
    </button>
 
      <button @click="$root.currentTool = 'writer'" >
        <svg data-v-92328502="" version="1.1" viewBox="0 0 24 24">
          <path
            data-v-92328502=""
            d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z"
          ></path>
        </svg>
      </button>

      <button @click="$root.currentTool = 'gridplanner'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>view-grid</title>
          <path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
        </svg>
  
      </button>

      <button @click="$root.currentTool = 'mindmap'">
        <svg data-v-92328502="" version="1.1" viewBox="0 0 24 24">
          <path
            data-v-92328502=""
            d="M21 16V13C21 11.89 20.11 11 19 11H13V8H15V2H9V8H11V11H5C3.89 11 3 11.89 3 13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21M11 4H13V6H11V4M5 20H3V18H5V20M13 20H11V18H13V20M21 20H19V18H21V20Z"
          ></path>
        </svg>
      </button>

      <button @click="$root.currentTool = 'timeline'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>timeline-outline</title>
          <path
            d="M4 2V8H2V2H4M2 22V16H4V22H2M5 12C5 13.11 4.11 14 3 14C1.9 14 1 13.11 1 12C1 10.9 1.9 10 3 10C4.11 10 5 10.9 5 12M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M10 6V18H22V6H10Z"
          />
        </svg>

      </button>

      <button @click="$root.currentTool = 'snowflake'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>snowflake</title>
          <path
            d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"
          />
        </svg>

      </button>

      <button @click="$root.currentTool = 'cardsdatabase'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>cards-outline</title>
          <path
            d="M11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05L6.93,20C7.24,20.77 7.97,21.23 8.74,21.25C9,21.25 9.27,21.22 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.25C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25M14.67,2.25L18.12,10.6V4.25A2,2 0 0,0 16.12,2.25M20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.78 21.47,4.36M11.19,4.22L16.17,16.24L8.78,19.3L3.8,7.29"
          />
        </svg>
      </button>

  </div>


    <span class="floatRight">
      <button @click="$root.openFileFromGoogleDrive" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Google Drive</title>
          <path
            d="M7.71,3.5L1.15,15L4.58,21L11.13,9.5M9.73,15L6.3,21H19.42L22.85,15M22.28,14L15.42,2H8.58L8.57,2L15.43,14H22.28Z"
          />
        </svg>
      </button>

      <button @click="$root.openFileFromDropBox" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Dropbox</title>
          <path
            d="M3 6.2L8 9.39L13 6.2L8 3L3 6.2M13 6.2L18 9.39L23 6.2L18 3L13 6.2M3 12.55L8 15.74L13 12.55L8 9.35L3 12.55M18 9.35L13 12.55L18 15.74L23 12.55L18 9.35M8.03 16.8L13.04 20L18.04 16.8L13.04 13.61L8.03 16.8Z"
          />
        </svg>
      </button>

      <button @click="$root.openFile()" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Load your Project</title>
          <path
            d="M20 18H4V8H20M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M16 17H14V13H11L15 9L19 13H16Z"
          />
        </svg>
      </button>
      <span v-if="$root.dbRef">
        <button title="Open in a new window" @click="$root.openNewWindow()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Open New Window</title>
            <path
              d="M12,10L8,14H11V20H13V14H16M19,4H5C3.89,4 3,4.9 3,6V18A2,2 0 0,0 5,20H9V18H5V8H19V18H15V20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4Z"
            />
          </svg>
        </button>

        <button @click="$root.snapShot()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Snapshot Project</title>
            <path
              d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"
            />
          </svg>
        </button>

        <button @click="$root.saveFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Save Project</title>
            <path
              d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"
            />
          </svg>
        </button>
        <button @click="$root.clearFile()">
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
.titlebtn {

  top: 0px;
  left: 0px;
}

.floatRight {

  top: 0px;
  right: 0px;
}
.projectname {
  width: 100%;
  text-align: center;
}
</style>
