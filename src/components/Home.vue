<template>
  <div class="">
    <div>
      <h1>Home</h1>
      <p>Ok so pick or load a database here</p>
          <div v-if="!$root.dbRef">
      <div v-if="$root.dblist.length > 0">
        <h2>Database List</h2>
        <ul>
          <li v-for="db in $root.dblist" :key="db.id">
            <button @click="$root.createDatabase(db)">{{db}}</button>
          </li>
        </ul>
      </div>
      <button @click="$root.createDatabase()">Create Db</button>
</div>
      </div>
    </div>
 
</template>

<script>

import { store } from "@/store/store.js";
export default {

  data() {
    return {
      store
    };
  },
  computed: {

  }
};
</script>
