<template>
  <div>
    <!-- ...existing code... -->
    <input type="file" @change="onFileChange" ref="fileInput" style="display: none;" />
    <img v-if="base64Image" :src="base64Image" alt="Image Preview" class="image-preview" @click="triggerFileUpload" />
    <img v-if="!base64Image" src="/resources/bookcover.png" alt="Image Preview" class="image-preview" @click="triggerFileUpload" />
    <!-- ...existing code... -->
  </div>
</template>

<script>
export default {
  props: {
    myimage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // ...existing code...
      base64Image: this.myimage
      // ...existing code...
    };
  },
  methods: {
    // ...existing code...
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 200; // Set your max width here
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            this.base64Image = canvas.toDataURL('image/jpeg');
            this.$emit('image-changed', this.base64Image);
          };
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    }
    // ...existing code...
  }
};
</script>

<style scoped>
.image-preview {
  max-width: 200px;
  margin: 0 auto;
  cursor: pointer;
}
</style>
