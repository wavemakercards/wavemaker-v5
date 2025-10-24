<script>
import { store } from "@/store/store";
import Logo from "@/components/interface/Logo.vue";
export default {
  components: {
    Logo,
  },
  data(){
    return {
        store
    }
  },
};
</script>

<template>
    <div id="TopToolBar">    
    <button @click="store.isProjectLoaded = false" class="logo"><logo></logo></button>
    <button>File</button>
    <button>Settings</button>
    <button>Save</button>
    <button>Upload</button>
  </div>
</template>