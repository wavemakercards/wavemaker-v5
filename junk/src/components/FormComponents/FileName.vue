<script>
export default {
 props: ['myuuid','formmode'],
 data(){
    return{
    myfile : null,
    editme : false
    }
 },
 async mounted(){
  if(this.formmode){
    this.editme = true
  }
    this.myfile = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Files.get(this.myuuid)))
 },
  methods: {
    update(){
      if(this.myfile.title == ""){
        this.myfile.title = "...."
      }
      console.log(this.myfile)
      this.$root.UpdateRecord("Files", this.myuuid, this.myfile) 
      if(!this.formmode){
      this.editme = false
      }
    }
  }
};
</script>

<template>
  <span v-if="myfile" >
  <div @dblclick="editme=true"  v-if="!editme"> {{ myfile.title }}</div> 
  <input v-if="editme" type="text" v-model="myfile.title" placeholder="......" @blur="update()" />
  </span>
</template>
