<script>
import autosize from "@/directives/autosize.js";
import ImageUpload from "@/components/FormComponents/ImageUpload.vue";
export default {
  directives: {
    autosize
  },
  components: {
    ImageUpload
  },
  methods: {
    handleChange() {
      this.$root.UpdateRecord(
        "Writer",
        this.$root.tools.writer.selected.uuid,
        this.this.$root.tools.writer.selected
      );
    },
    imageChanged(newImage) {
      this.this.$root.tools.writer.selected.cover = newImage;
      this.handleChange();
    }
  },
  name: "BookEditor",
  data() {
    return {
  
    };
  },
  async mounted() {
  },
};
</script>

<template>

    <div v-if="this.$root.tools.writer.selected" class="infocontainer">
<div class="bookcover">
  <ImageUpload :myimage="this.$root.tools.writer.selected.cover" @image-changed="imageChanged"/>
</div>


  <label>Book Title</label>


    <input
type="text"
v-model="this.$root.tools.writer.selected.title"
@blur="handleChange"
/>

  

  <label>Author</label>

    <input
      type="text"
      v-model="this.$root.tools.writer.selected.author"
      @blur="handleChange"
    />

  <label>Description</label>
 
    <textarea v-autosize v-model="this.$root.tools.writer.selected.description" />


</div>
</template>

<style scoped>
.infocontainer{
    margin:0 auto;
    max-width: 700px;
    padding: 10px;
}
.bookcover{
  text-align: center;

}

</style>
