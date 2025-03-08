<template>
  <div>
    <button @click="openFile">Open JSON File</button>
    <button @click="saveFile">Save JSON File</button>
    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: null,
      fileHandle: null,
    };
  },
  methods: {
    async openFile() {
      try {
        [this.fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'JSON Files',
              accept: {
                'application/json': ['.json'],
              },
            },
          ],
        });
        const file = await this.fileHandle.getFile();
        const contents = await file.text();
        this.jsonData = JSON.parse(contents);
      } catch (error) {
        console.error('Error opening file:', error);
      }
    },
    async saveFile() {
      try {
        const writable = await this.fileHandle.createWritable();
        await writable.write(JSON.stringify(this.jsonData, null, 2));
        await writable.close();
      } catch (error) {
        console.error('Error saving file:', error);
      }
    },
    async handleLaunch() {
      if ('launchQueue' in window && 'files' in window.LaunchParams.prototype) {
        window.launchQueue.setConsumer(async (launchParams) => {
          if (!launchParams.files.length) {
            return;
          }
          this.fileHandle = launchParams.files[0];
          const file = await this.fileHandle.getFile();
          const contents = await file.text();
          this.jsonData = JSON.parse(contents);
        });
      }
    },
  },
  mounted() {
    this.handleLaunch();
  },
};
</script>
