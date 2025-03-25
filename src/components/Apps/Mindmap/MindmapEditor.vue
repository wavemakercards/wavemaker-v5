<script>
import MiniEditor from "@/components/FormComponents/MiniEditor.vue";
export default {
  name: "MindmapEditor",
  components: {
    MiniEditor,
  },
  data() {
    return {
        mymindmap : null
    };
  },
  async mounted(){
    this.mymindmap = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Mindmap.get(this.$root.tools.mindmap.selected.uuid)))
  },
  methods: {
    async update() {
        console.log("updating")
      await this.$root.UpdateRecord(
        "Mindmap",
        this.mymindmap.uuid,
        this.mymindmap
      );
    },
    addTime(index) {
      let obj = {};
      obj.title = "Title Here";
      obj.text =
        "";
      obj.date = "Date Label";
      if (index === undefined || index === null) {
        this.mymindmap.content.items.push(obj);
      } else {
        this.mymindmap.content.items.splice(index, 0, obj);
      }
    },
  },
};
</script>

<template>
  <div class="subbar" v-if="mymindmap">
    <input
      @blur="update()"
      type="text"
      v-model="this.mymindmap.title"
    />
    <button class="btn" @click="$root.tools.mindmap.selected = null">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
  </div>

  <div class="mindmap" v-if="mymindmap">
    <ul>
      <li v-for="(item, index) in mymindmap.content.items">
        <div class="content">
          <h3>
            <input type="text" v-model="item.title" placeholder="Title Here" @blur="update()" />
          </h3>
          <p><MiniEditor v-model="item.text" @blur="update()" :key="mymindmap.lastupdated" /></p>
        </div>
        <div class="time">
          <h4>
            <input type="text" v-model="item.date" placeholder="label" @blur="update()"/>
          </h4>
        </div>
      </li>

      <div style="clear: both"></div>
      <div style="text-align: center">
        <button @click="addTime()" class="tlbutton">
          <svg icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>plus-circle-outline</title>
            <path
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
            />
          </svg>
        </button>
      </div>
    </ul>
  </div>
</template>


