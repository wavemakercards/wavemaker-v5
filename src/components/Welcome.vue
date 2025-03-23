<script>
import Logo from "@/components/InterfaceElements/Logo.vue";
export default {
  name: "About",
  components:{
    Logo
  },
  data() {
    return {
    };
  },
  methods: {
   async newProject() {
      this.$root.initDatabase();
   }
  },
};
</script>

<template>
  <div class="center-box">
    <div class="hero">
      <div style="display: flex; justify-content: center; align-items: center; ">   
      <Logo style="width:50px" />
      <h1>Wavemaker Cards</h1>
    </div>
      <p ><strong>Version 5</strong></p>
      <p style="padding: 10px; font-size: 1rem;">Start Writing</p>
  
    <div style="display: block;">
      <button class="btn welcomebtn" @click="newProject()">
        <svg class="icon" viewBox="0 0 24 24"><path  d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
        Create a new project</button>
       <button class="btn welcomebtn"  @click="$root.openFile()" >
        <svg class="icon" viewBox="0 0 24 24"><path  d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z"></path></svg>
        <span>
          Load a project (.wmc file)
        </span>
      </button>
      <button class="btn welcomebtn"  @click="$root.modal=true" >
        <svg class="icon" viewBox="0 0 24 24"><path  d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z"></path></svg>
        <span>
          MODAL
        </span>
      </button>
    </div>
  </div>
  </div>
</template>
<style scoped>

p{
  padding: 0px;
  margin: 0px;
}

.center-box {
  display: flex;
  justify-content:space-around;
  align-items: center;
  margin-top: 20px;
text-align: center;
}

.hero{
  padding: 50px;
  border-radius: 10px;
  min-width: 300px;
  max-width: 400px;
  width: 100%;
}

h1{
  font-size: 1.4em;
  font-weight: normal;
}
.welcomebtn{
  padding: 5px;
width: 320px;
}
</style>