<template>
  <div>
    <h1>Welcome</h1>
    <p>You dont have a project set</p>

    <p>
      Create New
      <input type="text" placeholder="Project Name" v-model="projectname" />
      <button @click="newProject()">Create</button>
    </p>
    <p>Load</p>
    <pre></pre>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      projectname: "",
    };
  },
  methods: {
   async newProject() {
      if (this.projectname == "") {
        this.$swal({
          title: "You need to provide a project name!",
          text: "Please provide a project name to create a new project.",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$root.log(`Warned for "${this.projectname}"`);
          }
        });
      } else {
      this.$root.log(`Creating new project "${this.projectname}"`);
      let obj = JSON.parse(JSON.stringify(this.$root.SettingsTemplate))
      obj.uuid = this.$root.uuid();
      obj.ProjectName = this.projectname
      this.$root.dbRef = await this.$root.AddRecord("Settings", obj);
      this.$root.initDatabase();
      }
    },
  },
};
</script>
