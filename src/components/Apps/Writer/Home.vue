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
<h1>hello?</h1>

  <div v-if="!$root.tools.writer.selected">
Pick a book
<pre>{{ $root.syncdb.Writer  }}</pre>


  </div>

  <div v-if="$root.tools.writer.selected">
<div class="lhs">
  <DocStructure />
  <div>
    
  </div>
  {{ $root.syncdb.Writer[$root.tools.writer.selected] }}
</div>
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