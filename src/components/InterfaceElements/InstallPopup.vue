<template>
  <div v-if="showInstallBanner" id="install-banner">
    <p>Install our app for a better experience!</p>
    <button @click="installApp">Install</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
      showInstallBanner: false,
    };
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    async installApp() {
      this.showInstallBanner = false;
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    },
  },
};
</script>

<style scoped>
#install-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #212121;;
  background-color: #fff;
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

  p {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
button {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
}

</style>
