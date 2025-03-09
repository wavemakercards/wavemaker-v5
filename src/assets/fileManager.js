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
          async saveFile() {
           // let j = await this.$root.dbExport();
           console.log("going", this.store.jsonData);
             const mydata = await this.$root.databaseExport();
             const contents = await mydata.text();
             this.store.jsonData = JSON.parse(contents);
             console.log("exporting", this.store.jsonData);

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
             console.log("File saved successfully");

             this.$swal({
              title: "Your File Was saved",
              text: "The file was saved successfully",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            })

             } catch (error) {
             console.error("Error saving file:", error);
             this.$swal({
              title: "There was a problem saving your file",
              text: "Please try again, or use other export tools to make a backup.",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            })
    
     
             }
          },
          async clearFile() {
            this.$root.closeProject();
            console.log("File cleared");
          }
    }
}
export default fileManager