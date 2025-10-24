<script>
import { store } from "@/store/store";
export default {
  data(){
    return {
        store
    }
  },
};
</script>

<template>
  <div id="RightSidePanel" :style="`top: ${$root.toolbarheight}px`">
    <div class="header"></div>
    <div class="content"></div>
  </div>
</template>