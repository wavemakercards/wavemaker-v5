
<script>
import Logo from "@/assets/Logo.vue";
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
      <Logo style="width:50px" />
      <h1 style="font-size: 1.5rem;"><strong>Wavemaker</strong><em>Cards</em> 5</h1>
      <p style="padding: 10px; font-size: 1rem;">Lets Start Writing</p>
  


    <div style="display: block;">
      <button class="btn" @click="newProject()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>book-open-page-variant-outline</title><path d="M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z" /></svg>
        Create</button>
       <button class="btn"  @click="$root.openFile()" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>upload-box-outline</title>
          <path
            d="M8 17V15H16V17H8M16 11L12 7L8 11H10.5V14H13.5V11H16M5 3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3M5 5V19H19V5H5Z"
          />
        </svg>
        Load a project
      </button>
    </div>
  </div>
  </div>
</template>
<style scoped>
.hero{
  border: 2px solid var(--bg2);
  padding: 20px;
  background-color: var(--bg3);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.hero button{
  display: block;
  width: 100%;
  height: 50px;
}
</style>