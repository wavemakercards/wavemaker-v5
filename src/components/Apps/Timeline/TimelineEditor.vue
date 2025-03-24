<script>
import MiniEditor from "@/components/FormComponents/MiniEditor.vue";
export default {
  name: "TimelineEditor",
  components: {
    MiniEditor,
  },
  data() {
    return {
        mytimeline : null
    };
  },
  async mounted(){
    this.mytimeline = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Timeline.get(this.$root.tools.timeline.selected.uuid)))
  },
  methods: {
    async update() {
        console.log("updating")
      await this.$root.UpdateRecord(
        "Timeline",
        this.mytimeline.uuid,
        this.mytimeline
      );
    },
    addTime(index) {
      let obj = {};
      obj.title = "Title Here";
      obj.text =
        "";
      obj.date = "Date Label";
      if (index === undefined || index === null) {
        this.mytimeline.content.items.push(obj);
      } else {
        this.mytimeline.content.items.splice(index, 0, obj);
      }
    },
  },
};
</script>

<template>
  <div class="subbar" v-if="mytimeline">
    <input
      @blur="update()"
      type="text"
      v-model="this.mytimeline.title"
    />
    <button class="btn" @click="$root.tools.timeline.selected = null">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
  </div>

  <div class="timeline" v-if="mytimeline">
    <ul>
      <li v-for="(event, index) in mytimeline.content.items">
        <div class="content">
          <h3>
            <input type="text" v-model="event.title" placeholder="Title Here" @blur="update()" />
          </h3>
          <p><MiniEditor v-model="event.text" @blur="update()" :key="mytimeline.lastupdated" /></p>
        </div>
        <div class="time">
          <h4>
            <input type="text" v-model="event.date" placeholder="label" @blur="update()"/>
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

<style scoped>
.tlbutton {
  position: relative;
  background-color: var(--accent2);
  width: 50px;
  height: 50px;
  border: 0px;
  color: #fff;

  border-radius: 50%;
  line-height: 75px;
  fill: #fff;
  margin-left: 2px;
}
.time input {
  padding: 0px;
  width: 100%;
  margin: 0px;
}
.content {
  background-color: #fff;
  padding: 20px;
  color: #000;
}
.timeline {
  position: relative;
  margin: 50px auto;
  padding: 40px 0;
  width: 1000px;
  box-sizing: border-box;
}
.timeline:before {
  content: "";
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  background: #c5c5c5;
}
.timeline ul {
  padding: 0;
  margin: 0;
}
.timeline ul li {
  list-style: none;
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}
.timeline ul li:nth-child(odd) {
  float: left;
  text-align: right;
  clear: both;
}
.timeline ul li:nth-child(even) {
  float: right;
  text-align: left;
  clear: both;
}
.content {
  padding-bottom: 20px;
}
.timeline ul li:nth-child(odd):before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 24px;
  right: -11px;
  background: var(--accent2);
  border-radius: 50%;
}
.timeline ul li:nth-child(even):before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 24px;
  left: -9px;
  background: var(--accent2);
  border-radius: 50%;
}
.timeline ul li h3 {
  padding: 0;
  margin: 0;
  color: var(--accent2);
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid var(--accent2);
}
.timeline ul li p {
  margin: 0px 0 0;
  padding: 0;
  text-align: left;
}
.timeline ul li .time h4 {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.timeline ul li:nth-child(odd) .time {
  position: absolute;
  top: 12px;
  right: -200px;
  margin: 0;
  padding: 0px 10px;
  background: var(--accent2);
  color: #fff;
  border-radius: 18px;
}
.timeline ul li:nth-child(even) .time {
  position: absolute;
  top: 12px;
  left: -200px;
  margin: 0;
  padding: 0px 10px;
  background: var(--accent2);
  color: #fff;
  border-radius: 18px;
}
@media (max-width: 1000px) {
  .timeline {
    width: 100%;
  }
}
@media (max-width: 767px) {
  .timeline {
    width: 100%;
    padding-bottom: 0;
  }
  h1 {
    font-size: 40px;
    text-align: center;
  }
  .timeline:before {
    left: 20px;
    height: 100%;
  }
  .timeline ul li:nth-child(odd),
  .timeline ul li:nth-child(even) {
    width: 100%;
    text-align: left;
    padding-left: 50px;
    padding-bottom: 50px;
  }
  .timeline ul li:nth-child(odd):before,
  .timeline ul li:nth-child(even):before {
    top: -18px;
    left: 16px;
  }
  .timeline ul li:nth-child(odd) .time,
  .timeline ul li:nth-child(even) .time {
    top: -30px;
    left: 50px;
    right: inherit;
  }
}
</style>
