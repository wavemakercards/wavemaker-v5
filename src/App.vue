<script>
import { store } from "@/store/store.js";
import FileLoader from './components/FileManagement/FileLoader.vue';
import InstallPopup from './components/InstallPopup.vue';
import router from './router';

export default {
  components: {
    FileLoader,
    InstallPopup,
  },
  data() {
    return {
      store,
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<template>
  <div id="app">
    <FileLoader />
    <InstallPopup />
    <router-view></router-view>
  </div>
</template>
