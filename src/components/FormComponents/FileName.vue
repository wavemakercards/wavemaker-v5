<script>
export default {
 props: ['myuuid'],
 data(){
    return{
    myfile : null
    }
 },
 async mounted(){
    console.log(await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Files.get(this.myuuid))))
    this.myfile = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Files.get(this.myuuid)))
 },
  methods: {
    update(){
      this.$root.UpdateRecord("Files", this.myuuid, this.myfile) 
    }
  }
};
</script>

<template>
  <span v-if="myfile">
     <input type="text" v-model="myfile.title" placeholder="......" @blur="update()" />
  </span>
</template>
