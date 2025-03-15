//import { db, databaseImport, databaseExport, createDB } from "@/assets/db.js";
import Dexie from "dexie";
import {importDB, exportDB} from "dexie-export-import";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { v4 as uuid } from "uuid";



export const databaseExport = async (db)=> {
  const blob = await db.export()
  return blob
}

const dexieDB = {
  data() {
    return {
      dbRef: null, // the database this window will be using to tell me it is loaded
      db : null,
      databaseName: null,
      dblist: [],
      useObservable,
      liveQuery,
      uuid,
      syncdb: {},
      DBstores : {
        Settings: `uuid, settings, lastupdated`,
        Writer: `uuid, title, description, files, lastupdated`,
        Cards: `uuid, title,description,content,style,labels,options,lastupdated`,
        Files: `uuid, writerid, title, content, lastupdated`,
        Snowflake: `uuid, title, description,content,lastupdated`,
        Timeline: `uuid, title, description,content,lastupdated`,
        Gridplanner: `uuid, title, description,content,lastupdated`,
        Mindmap: `uuid, title, description,content,lastupdated`,
        ImageLibrary: `uuid, title, base64`
      }
    };
  },
  methods: {
    async getDatabases(){
     /* this.dblist = await Dexie.getDatabaseNames();
      const projectNames = [];
      for (const dbName of this.dblist) {
        const db = new Dexie(dbName);
        db.version(1).stores(this.DBstores);
        const settings = await db.Settings.toArray();
        if (settings.length > 0) {
          projectNames.push({ dbName, projectName: settings[0].ProjectName });
        }
        db.close();
      }
     console.log(projectNames);
   */
  },
    async initDatabase(){
      console.log(this.databaseName)
      if(!this.databaseName){
        console.log("New Db Created")
        this.databaseName = this.uuid();
      }
      if(!this.db){
        console.log("Creating new database")
        this.db = await new Dexie(this.databaseName);
        console.log("Creating new stores")
        this.db.version(1).stores(this.DBstores);
      }
 
       // see if we are alreay running a project
      let settingsCheck = await this.db.Settings.toArray();
      let settings = {};
      if (settingsCheck) {
        if (settingsCheck.length) {
          settings = settingsCheck[0];        
        this.dbRef = settings.uuid;
        } else {
        let obj = JSON.parse(JSON.stringify(this.$root.SettingsTemplate))
        obj.uuid = this.$root.uuid();
        obj.ProjectName = "New Project";
        await this.$root.AddRecord("Settings", obj);
        this.dbRef = obj.uuid;
      }
      this.syncdb.Settings = await this.useObservable(this.liveQuery(async () => await this.db.Settings.get(this.dbRef)))
    }
    },
    async dbImport(jsonData) {
      this.databaseName = jsonData.data.databaseName;
      const mydata = new Blob([JSON.stringify(jsonData)], {
        type: "text/json;charset=utf-8",
      });
      this.db = await importDB(mydata, { clearTablesBeforeImport: true })
      await this.initDatabase()
    },

   async dbExport()  {
    const db= await new Dexie(this.databaseName).open();
    const blob = await databaseExport(db)
    db.close()
    return blob
  },
    async getImage(uuid) {
      return await this.$root.db.ImageLibrary.get(uuid);
    },
    async AddRecord(myTable, myData) {
      myData.lastupdated = Date.now();
      return await this.db[myTable].add(myData);

    },
    async UpdateRecord(myTable, myKey, myData) {
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
        text: "This will close the project any unsaved changes will be lost!",
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
    async closeAndDeleteDatabase() {
      if (this.db) {
        await this.db.close();
        await Dexie.delete(this.databaseName);
        console.log(`Database ${this.databaseName} closed and deleted.`);
      }
    },
  },
  async mounted(){
    if(this.databaseName){
      this.initDatabase()
    }else{
    this.getDatabases()
   
    }
    window.addEventListener('beforeunload', this.closeAndDeleteDatabase);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.closeAndDeleteDatabase);
  }
};
export default dexieDB;
