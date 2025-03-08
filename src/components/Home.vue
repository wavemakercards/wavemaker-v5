<template>
  <div>
    <SubBar />
    <h1>Home</h1>
    <p>Welcome to the Home page!</p>
    <pre>{{ store }}</pre>
  </div>
</template>

<script>
import SubBar from '@/components/SubBar.vue';
import { store } from "@/store/store.js";
export default {
  components: {
    SubBar,
  },
  data() {
    return {
      store,
    };
  },
  
};
</script>
