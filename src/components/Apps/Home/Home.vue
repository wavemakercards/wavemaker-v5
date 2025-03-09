<script>
import Logo from "@/assets/Logo.vue";
import ProjectName from "@/components/FormComponents/ProjectName.vue";
export default {
  name: 'ProjectHome',
  components: {
    Logo,
    ProjectName
  },
  methods: {
    update(){
      this.$root.UpdateRecord("Settings", this.$root.syncdb.Settings.uuid, this.$root.syncdb.Settings) 
    }
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
   
  </div>
</template>

<style scoped>
.project-home {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 50px;
  background-color: var(--bg3);
  height: calc(100% - 40px);
  border:2px solid #212121;
}
</style>