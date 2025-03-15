<script>
import DocStructure from "@/components/Apps/Writer/DocStructure.vue"
export default {
  name: 'WriterHome',
  components: {
    DocStructure
  },
  methods: {
  }
};
</script>

<template>
  
<div class="lhs">
  <DocStructure />
  <div>
    
  </div>
  {{ $root.syncdb.Writer[$root.tools.writer.selectedbook] }}
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