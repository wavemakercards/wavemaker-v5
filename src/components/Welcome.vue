<template>
  <div class="center-box">
    <h1>Welcome</h1>
    <p>You dont have a project set</p>

    <p>
      Create New
      <button @click="newProject()">Create</button>
 
       <button @click="$root.openFile()" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>upload-box-outline</title>
          <path
            d="M8 17V15H16V17H8M16 11L12 7L8 11H10.5V14H13.5V11H16M5 3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3M5 5V19H19V5H5Z"
          />
        </svg>
        Load a project
      </button>
    </p>

  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
    };
  },
  methods: {
   async newProject() {
      this.$root.log(`Creating new project "${this.projectname}"`);
      let obj = JSON.parse(JSON.stringify(this.$root.SettingsTemplate))
      obj.uuid = this.$root.uuid();
      obj.ProjectName = this.projectname
      this.$root.dbRef = await this.$root.AddRecord("Settings", obj);
      this.$root.initDatabase();
   }
  },
};
</script>
