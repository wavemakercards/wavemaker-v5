<template>
  <div class="subbar" v-if="mygridplanner">
    <input @blur="update()" type="text" v-model="this.mygridplanner.title" />
    <button @click="addRow" class="btn">
      <svg class="icon" style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z"
        />
      </svg>
    </button>

    <button @click="addCol" class="btn">
      <svg class="icon" style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"
        />
      </svg>
    </button>
    <button class="btn" @click="$root.tools.gridplanner.selected = null">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
  </div>

  <div class="scroller" v-if="mygridplanner">
    <div class="grid-container" :style="`width:${tablewidth}px`">
      <div class="grid-row">
        <div class="grid-header col1" :style="`${colwidth}px`"></div>
        <VueDraggable
          v-model="mygridplanner.content.headers"
          :animation="150"
          handle=".handle"
          @change="update()"
        >
          <div
            v-for="(header, index) in mygridplanner.content.headers"
            :key="'header-' + index"
            class="grid-header"
            :style="`${colwidth}px`"
          >
            <div class="handle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>menu</title>
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
              </svg>
            </div>
            <textarea
              v-autosize
              @blur="update()"
              class="handleinput"
              type="text"
              v-model="header.title"
              placeholder="Header"
            />
          </div>
        </VueDraggable>
      </div>
      <div>
        <VueDraggable
          v-model="mygridplanner.content.rows"
          :animation="150"
          handle=".handle"
          @change="update()"
        >
          <div
            v-for="(row, rowIndex) in mygridplanner.content.rows"
            :key="'row-' + rowIndex"
            class="grid-row"
          >
            <div class="grid-header col1" :style="`${colwidth}px`">
              <div class="handle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>menu</title>
                  <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
              </div>
              <textarea
                v-autosize
                @blur="update()"
                class="handleinput"
                type="text"
                v-model="row.title"
                placeholder="Title"
              />
            </div>
            <div
              v-for="(header, colIndex) in mygridplanner.content.headers"
              :key="'cell-' + rowIndex + '-' + colIndex"
              class="grid-cell"
              :style="`${colwidth}px`"
            >
              <GridPlannerCell
                v-model="row.cells[header.uuid]"
                @MakeChange="update()"
              />
            </div>
          </div>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script>
import autosize from "@/directives/autosize.js";
import { VueDraggable } from "vue-draggable-plus";
import GridPlannerCell from "./GridPlannerCell.vue";
export default {
  name: "GridPlanner",
  components: {
    VueDraggable,
    GridPlannerCell,
  },
  directives: {
    autosize,
  },
  computed: {
    tablewidth() {
      return this.colwidth * (this.mygridplanner.content.headers.length + 1);
    },
  },
  data() {
    return {
      mygridplanner: null,
      colwidth: 300,
    };
  },
  async mounted() {
    this.mygridplanner = await this.$root.useObservable(
      this.$root.liveQuery(
        async () =>
          await this.$root.db.Gridplanner.get(
            this.$root.tools.gridplanner.selected.uuid
          )
      )
    );
  },
  methods: {
    async update() {
      console.log("updating");
      await this.$root.UpdateRecord(
        "Gridplanner",
        this.mygridplanner.uuid,
        this.mygridplanner
      );
    },
    addCol() {
      let obj = {};
      obj.uuid = this.$root.uuid();
      obj.title = "";
      this.mygridplanner.content.headers.push(obj);
      this.mygridplanner.content.rows.forEach((el) => {
        el.cells[obj.uuid] = [];
      });
      this.update();
    },
    addRow() {
      let obj = {};
      obj.title = "";
      obj.cells = {};
      this.mygridplanner.content.headers.forEach((el) => {
        obj.cells[el.uuid] = [];
      });
      this.mygridplanner.content.rows.push(obj);
      this.update();
    },
    deleteCol(i) {
      this.$swal({
        title: "Delete?",
        text: "this is permmanend",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          let delId = this.mygridplanner.content.headers[i].uuid;
          // remove from all the rows
          this.mygridplanner.content.rows.forEach((row) => {
            delete row.cells[delId];
          });
          this.mygridplanner.content.headers.splice(i, 1);
          this.update();

          this.$swal("Success", "All done", "success");
        }
      });
    },
    deleteRow(i) {
      this.$swal({
        title: "Delete?",
        text: "pernamnen",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.mygridplanner.content.rows.splice(i, 1);
          this.update();

          this.$swal("Success", "that worked", "success");
        }
      });
    },
  },
};
</script>

<style scoped>
.handle {
  fill: #fff;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 18px;
  cursor: grab;
}
.handleinput {
  padding-left: 30px;
  text-align: left;
}

.scroller {
  position: absolute;
  overflow: auto;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 30px;
}

.grid-container {
  display: block;
  padding: 0px;
  color: #000;
}

.grid-header {
  position: relative;
  display: table-cell;
  font-weight: bold;
  background-color: #424242;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin: 5px;
  width: 300px;
  vertical-align: top;
}
.col1 {
  width: 300px;
  text-align: left;
}

.grid-row {
  display: table-row;
}

.grid-cell {
  position: relative;
  display: table-cell;
  vertical-align: top;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px;
  margin: 5px;
  width: 300px;
}
</style>
