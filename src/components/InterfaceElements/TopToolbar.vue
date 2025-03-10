<script>
import { store } from "@/store/store.js";
import Logo from "@/components/InterfaceElements/Logo.vue";
import ProjectName from "@/components/FormComponents/ProjectName.vue";
export default {
  components: {
    Logo,
    ProjectName,
  },
  data() {
    return {
      store,
    };
  },
  methods: {},
};
</script>

<template>
  <div class="toptoolbar">
    <button @click="" class="titlebtn">
      <Logo style="width: 30px; height: 30px" />
    </button>

    <ProjectName class="projectname" />

    <span class="floatRight">
      <button @click="$root.openFile()" v-if="!$root.dbRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>upload-box-outline</title>
          <path
            d="M8 17V15H16V17H8M16 11L12 7L8 11H10.5V14H13.5V11H16M5 3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3M5 5V19H19V5H5Z"
          />
        </svg>
      </button>
      <span v-if="$root.dbRef">
        
        
        
        
        <button @click="$root.snapShot()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>camera-outline</title><path d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z" /></svg>
        
      </button>
        
        
        
        
        
        <button @click="$root.saveFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>content-save-outline</title>
            <path
              d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"
            />
          </svg>
        </button>
        <button @click="$root.clearFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>close-box-outline</title>
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
  position: absolute;
  top:0px;
  left:0px;
}

.floatRight{
  position: absolute;
  top:0px;
  right:0px;
}
.projectname{
  width: 100%;
  text-align: center;
}
</style>
