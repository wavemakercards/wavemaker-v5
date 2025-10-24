<script>
import Logo from "@/components/InterfaceElements/Logo.vue";
export default {
  components: {
    Logo,
  },
  data() {
    return {};
  },
  methods: {
    async newProject() {
      this.$root.initDatabase();
    },
  },
};
</script>

<template>
  <div id="WelcomeScreen">
    <div class="hero">
      <div style="display: flex; justify-content: center; align-items: center">
        <Logo style="width: 50px" />
        <h1>Wavemaker Cards</h1>
      </div>
      <p><strong>Version 5</strong></p>
      <p style="padding: 10px; font-size: 1rem">Start Writing</p>

      <div>
        <button @click="newProject()">
          <svg viewBox="0 0 24 24">
            <path
              d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          <span>
          Create a new project</span>
        </button>
        <button @click="$root.openFile()">
          <svg viewBox="0 0 24 24">
            <path
              d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z"
            ></path>
          </svg>
          <span> Load a project (.wmc file) </span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>


#WelcomeScreen {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  text-align: center;
p {
  padding: 0px;
  margin: 0px;
}
  .hero {
    padding: 50px;
    border-radius: 10px;
    min-width: 300px;
    max-width: 400px;
    width: 100%;
    h1 {
      font-size: 1.4em;
      font-weight: normal;
    }
  }

  button{
    width: 100%;
    background-color: var(--accent1);
    color: var(--accent1-fg);
    margin: 10px;
    border: 0px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 8px;
    font-weight: normal;
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    > svg{
      width: 30px;
    }
    &:hover,
    &:focus {
       transform: scale(1.1);
      border: 0px;
      outline: none;
      background-color: var(--info);
      color: var(--info-fg);
     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }
}





</style>
