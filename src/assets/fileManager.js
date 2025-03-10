const fileManager = {
    data() {
        return {
        }
    },
    methods: {
        async openFile() {
            try {
              [this.store.fileHandle] = await window.showOpenFilePicker({
                types: [
                  {
                    description: "Wavemaker Cards File",
                    accept: {
                      "application/json": [".wmc"],
                    },
                    extensions: ["wmc"],
                  },
                ],
              });
              const file = await this.store.fileHandle.getFile();
              const contents = await file.text();
              this.store.jsonData = JSON.parse(contents);
              this.$root.dbImport(this.store.jsonData);
            } catch (error) {
              console.error("Error opening file:", error);
            }
          },
        async snapShot() {
            let filename = this.sanitizeFilename(this.$root.syncdb.Settings.ProjectName) ;
            const mydata = await this.$root.dbExport();
            const contents = await mydata.text();
            this.store.jsonData = JSON.parse(contents);

            const blob = new Blob([JSON.stringify(this.store.jsonData, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          },
          sanitizeFilename(str) {
            const date = new Date();
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
            return str
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // Remove illegal characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
              + `-${formattedDate}.wmc`; // Append the formatted date and time
          },
          async saveFile() {
             const mydata = await this.$root.dbExport();
             const contents = await mydata.text();
             this.store.jsonData = JSON.parse(contents);
             try {
             if (!this.store.fileHandle) {
               this.store.fileHandle = await window.showSaveFilePicker({
               suggestedName: "untitled.wmc",
               types: [
                 {
                 description: "Wavemaker Cards File",
                 accept: {
                   "application/json": [".wmc"],
                 },
                 },
               ],
               });
             }
             const writable = await this.store.fileHandle.createWritable();
             await writable.write(JSON.stringify(this.store.jsonData, null, 2));
             await writable.close();
   
             this.$swal({
              title: "Your File Was saved",
              text: "The file was saved successfully",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            })

             } catch (error) {
             this.$swal({
              title: "Your file was not saved",
              text: "Please try again, or use other export tools to make a backup.",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            })
             }
          },
          async clearFile() {
            this.$root.closeProject();
          }
    },
    mounted() {
      if ("launchQueue" in window && "files" in window.LaunchParams.prototype) {
          window.launchQueue.setConsumer(async (launchParams) => {
            if (!launchParams.files.length) {
              return;
            }
            this.store.fileHandle = launchParams.files[0];
            const file = await this.store.fileHandle.getFile();
            const contents = await file.text();
            this.store.jsonData = JSON.parse(contents);
            await this.$root.dbImport(this.store.jsonData);
          });
        }

    },
}
export default fileManager