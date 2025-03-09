import { db, databaseImport, databaseExport } from "@/assets/db.js";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { v4 as uuid } from "uuid";
const dexieDB = {
  data() {
    return {
      dbRef: null, // the database this window will be using to tell me it is loaded
      db,
      useObservable,
      liveQuery,
      databaseImport,
      databaseExport,
      windowID: null,
      uuid,
      syncdb: {},
    };
  },
  methods: {
    log(...msg){
      // custom log function
      console.log(...msg);
    },
    async initDatabase() {
      this.windowID = this.uuid(); // each window generates a unique ID so it knows who is doing the emitting of changes
      // see if we are alreay running a project
      let settingsCheck = await this.$root.db.Settings.toArray();
      let settings = {};
      if (settingsCheck) {
        if (settingsCheck.length) {
          settings = settingsCheck[0];
          this.$root.log(" settings found", settings);
         
          this.syncdb.Settings = await this.useObservable(this.liveQuery(async () => await this.db.Settings.get(settings.uuid)))

          this.dbRef = settings.uuid;
        }else {
          this.$root.log("no settings found");
        }
      } 
    },
    async dbImport(jsonData) {
      let dbname = jsonData.data.databaseName;
      const mydata = new Blob([JSON.stringify(jsonData)], {
        type: "text/json;charset=utf-8",
      });
      if (dbname != "wavemakerv5") {
        jsonData.data.databaseName = "wavemakerv5";
      }
      this.$root.log("importing", mydata, dbname);
      await databaseImport(mydata);
      this.$root.log("imported", dbname);
      this.initDatabase();
    },
    async getImage(uuid) {
      return await this.$root.db.ImageLibrary.get(uuid);
    },
    async AddRecord(myTable, myData) {
      myData.lastupdated = Date.now();
      return await this.db[myTable].add(myData);

    },
    async UpdateRecord(myTable, myKey, myData) {
      //this.$root.log("updating", myTable, myKey, myData)
      myData.uuid = myKey;
      myData.lastupdated = Date.now();
      return await this.db[myTable].put(JSON.parse(JSON.stringify(myData)));
    },
    async DeleteRecord(myTable, myKey) {
      return await this.db[myTable].delete(myKey);
    },
    clearDatabase() {
      this.$root.db.Settings.clear();
      this.$root.db.Writer.clear();
      this.$root.db.Cards.clear();
      this.$root.db.Files.clear();
      this.$root.db.Mindmap.clear();
      this.$root.db.ImageLibrary.clear();
      this.$root.db.Gridplanner.clear();
      this.$root.db.Snowflake.clear();
      this.$root.db.Timeline.clear();
    },
    async getSettings(uuid) {
      if (!uuid) {
        let arr = await this.$root.db.Settings.toArray();
        uuid = arr[0].uuid;
      }
      this.syncdb.Settings = this.$root.useObservable(
        this.$root.liveQuery(async () => await this.$root.db.Settings.get(uuid))
      );
    },
    async closeProject() {
      this.$swal({
        title: "Are you sure?",
        text: "This will close the project and clear the database!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, close it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.removeEventListener("beforeunload", this.$root.unloadEvent);
          this.dbRef = null;
          this.$root.clearDatabase();

          await this.$root.db.delete();
          location.reload();
        }
      });
    },
  },
};
export default dexieDB;
