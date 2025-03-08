<template>
    <div class="file-tools">
      <button @click="">
        <Logo style="width: 30px; height: 30px;" />
      </button>
      <span>
      <button @click="openFile" v-if="!store.jsonData">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>upload-box-outline</title><path d="M8 17V15H16V17H8M16 11L12 7L8 11H10.5V14H13.5V11H16M5 3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3M5 5V19H19V5H5Z" /></svg>
      </button>
      <span v-if="store.jsonData">
        <button @click="saveFile()" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save-outline</title><path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z" /></svg>
        </button>
        <button @click="clearFile()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" /></svg>
         </button>

      </span>
  
      </span>
    </div>
    <pre>{{ store.jsonData }}</pre>
  </template>
  
  <script>
  import { store } from "@/store/store.js";
  import Logo from '@/assets/Logo.vue';
  export default {
    components: {
      Logo,
    },
    data() {
      return {
       store
      };
    },
    methods: {
      async openFile() {
        try {
          [this.store.fileHandle] = await window.showOpenFilePicker({
            types: [
              {
                description: 'Wavemaker Cards File',
                accept: {
                  'application/json': ['.wmc'],
                },
                extensions: ['wmc'],
              },
            ],
          });
          const file = await this.store.fileHandle.getFile();
          const contents = await file.text();
          this.store.jsonData = JSON.parse(contents);
        } catch (error) {
          console.error('Error opening file:', error);
        }
      },
      async saveFile() {
        try {
          const writable = await this.store.fileHandle.createWritable();
          await writable.write(JSON.stringify(this.store.jsonData, null, 2));
          await writable.close();
          console.log('File saved successfully');
        } catch (error) {
          console.error('Error saving file:', error);
        }
      },
      clearFile() {
        this.store.jsonData = null;
        this.store.fileHandle = null;
        console.log('File cleared');
      },
      async handleLaunch() {
        if ('launchQueue' in window && 'files' in window.LaunchParams.prototype) {
          window.launchQueue.setConsumer(async (launchParams) => {
            if (!launchParams.files.length) {
              return;
            }
            this.store.fileHandle = launchParams.files[0];
            const file = await this.store.fileHandle.getFile();
            const contents = await file.text();
            this.store.jsonData = JSON.parse(contents);
          });
        }
      },
    },
    mounted() {
      this.handleLaunch();
    },
  };
  </script>
  