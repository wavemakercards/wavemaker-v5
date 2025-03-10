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
    <div style="text-align: center;">
      <Logo style="width: 150px;height: 150px;"/>
    </div>
  
    <h2 class="inputstyle"><ProjectName /></h2>
    <!--
    
     <button
    v-if="$root.mainwindow"
    @click="$root.openNewWindow()">New Window</button>
    -->
   
    <div class="toolcard-grid">
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
      <div class="toolcard">
      <h2>Write</h2>
      <p>Write your novel here</p>
      </div>
    </div>
  
  
  
  
  </div>
</template>

<style scoped>

.inputstyle{
  background-color: var(--bg3);
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
  text-align: center;
  border-radius: 10px;
}
.project-home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}

.toolcard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.toolcard{
  background-color: #fff;
  border-radius: 10px;
  color: #212121;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.toolcard:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>