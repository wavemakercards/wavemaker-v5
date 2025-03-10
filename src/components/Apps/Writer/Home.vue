<script>
import MyTree from "@/components/Apps/Writer/MyTree.vue"
export default {
  name: 'WriterHome',
  components: {
    MyTree
  },
  methods: {
  }
};
</script>

<template>
  
<div class="lhs">
  <MyTree />
</div>
  
</template>

<style scoped>
.lhs{
  min-width: 320px;
  position: absolute;
  top:0px;
  bottom: 0px;
  left:0px;
  overflow: auto;
  
}
</style>