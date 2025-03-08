<script>
import { store } from "@/store/store.js";
import TopToolbar from './components/TopToolbar.vue';
import FooterBar from './components/FooterBar.vue';
import InstallPopup from './components/InstallPopup.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';

export default {
  components: {
    TopToolbar,
    InstallPopup,
    FooterBar,
    Home,
    About
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
    <TopToolbar />
    <div class="container">
      <Home v-if="store.tools.current === 'home'"/>
      <About v-if="store.tools.current === 'about'"/>
    </div>
    <FooterBar />
  </div>
  <InstallPopup />
</template>
