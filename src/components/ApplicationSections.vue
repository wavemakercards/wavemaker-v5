<script>
import { store } from "@/store/store.js";
import ProjectHome from '@/components/Apps/Home/Home.vue'
export default {
  name: 'App Home',
  components: {
    ProjectHome
  },
  data() {
    return {
      store,
    };
  }
  };
</script>

<template>
<ProjectHome v-if="!store.tools.current" />
</template>