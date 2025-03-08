<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the Home page!</p>
    <pre>{{ store }}</pre>
  </div>
</template>

<script>
import { store } from "@/store/store.js";
export default {
  name: 'Home',
  data() {
    return {
      store,
    };
  },
  
};
</script>
