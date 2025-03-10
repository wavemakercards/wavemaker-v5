<script>
import Logo from "@/components/InterfaceElements/Logo.vue";
import ProjectName from "@/components/FormComponents/ProjectName.vue";
export default {
  name: 'ProjectHome',
  components: {
    Logo,
    ProjectName
  },
  methods: {
  }
};
</script>

<template>
  <div class="project-home" v-if="this.$root.syncdb.Settings">
    <div style="display: flex; justify-content: center;">
      <Logo style="width: 150px;height: 150px;"/>
    </div>
    <h1>Get Started writing</h1>
    <label>You can change the Project name here</label>
    <h2><ProjectName /></h2>
    {{ this.$root.databaseName }}
    <button
    v-if="$root.mainwindow"
    @click="$root.openNewWindow()">New Window</button>
  </div>
</template>

<style scoped>
.project-home {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 50px;
  background-color: var(--neutral-light);
  color: var(--neutral-dark);
  height: calc(100% - 40px);
  border:2px solid #212121;
}
</style>