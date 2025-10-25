<script>
import MiniEditor from "@/components/FormComponents/MiniEditor.vue";
export default {
  name: "SnowflakeEditor",
  components: {
    MiniEditor,
  },
  data() {
    return {
        mysnowflake : null
    };
  },
  async mounted(){
    this.mysnowflake = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Snowflake.get(this.$root.tools.snowflake.selected.uuid)))

    this.startFlake()
  },
  methods: {
    async update() {
        console.log("updating")
      await this.$root.UpdateRecord(
        "Snowflake",
        this.mysnowflake.uuid,
        this.mysnowflake
      );
    },

    exportToManuscript() {
      //loop throught the timeline and add all the nodes to a writer object and create the files


      this.$swal(
        {
          title: "Export?",
          text: "message",
          icon: 'question',
          showCancelButton: true,

          confirmButtonText: "confirm",
          cancelButtonText: "cancel"
        }).then((result) => {
          if (result.isConfirmed) {


            let newWriter = {}
            newWriter.uuid = this.$root.uuid()
            newWriter.title = this.$root.tools.snowflake.selected.title
            newWriter.descripton = this.$root.tools.snowflake.selected.description
            newWriter.files = []

            this.$root.tools.snowflake.selected.content.forEach(tl => {
              console.log("SNOW >>>", tl)
              let uuid = this.$root.uuid()
              let newfile = {}
              newfile.writerid = newWriter.uuid
              newfile.title = tl.title
              newfile.content = tl.content
              newfile.notes = []
              newfile.uuid = uuid
              newfile.wordcount = this.$root.wordCounter(tl.content)

              this.$root.AddRecord("Files", newfile)


              let o = {}
              o.uuid = uuid
              o.open = false
              o.type = "file"
              o.children = []
              newWriter.files.push(o)

            })

            this.$root.AddRecord("Writer", newWriter)

            this.$swal(
              "Success",
              "this.$root.setlang.confirmmodal.exportsuccessfeedback",
              'success'
            )
          }
        }
        );




    },

    openflake(flake) {

      if (!flake.children.length) {
        let obj = {};
        obj.level = flake.level + 1;
        obj.content = "";
        obj.open = false;
        obj.children = [];
        obj.title = "";

        flake.children.push({ ...obj })
        flake.children.push({ ...obj })
        flake.children.push({ ...obj })


      }
      flake.open = !flake.open
      this.update()
    },
    deleteFlake(index) {


      this.$swal(
        {
          title: "Delete",
          text: "this.$root.setlang.confirmmodal.noundo",
          icon: 'question',
          showCancelButton: true,

          confirmButtonText: "confirm",
          cancelButtonText: "cancel"
        }).then((result) => {
          if (result.isConfirmed) {

            this.$root.tools.snowflake.selected.content.splice(index, 1)
            this.startFlake()
            this.update()

            this.$swal(
              this.$root.setlang.confirmmodal.success,
              this.$root.setlang.confirmmodal.successfeedback,
              'success'
            )
          }
        }
        );
    },
    replace(flake, index) {


      this.$swal(
        {
          title: "Replace Card?",
          text: "this.$root.setlang.confirmmodal.snowconfirmtext",
          icon: 'question',
          showCancelButton: true,

          confirmButtonText: "confirm",
          cancelButtonText: "cancel"
        }).then((result) => {
          if (result.isConfirmed) {

            let f0 = { ...flake.children[0] }
            let f1 = { ...flake.children[1] }
            let f2 = { ...flake.children[2] }


            // insert in reverse
            this.$root.tools.snowflake.selected.content.splice(index + 1, 0, f2)
            this.$root.tools.snowflake.selected.content.splice(index + 1, 0, f1)
            this.$root.tools.snowflake.selected.content.splice(index + 1, 0, f0)

            // delete the old one 
            this.$root.tools.snowflake.selected.content.splice(index, 1)

            this.update()


            this.$swal(
              "success",
              "this.$root.setlang.confirmmodal.snowconfirmmsg",
              'success'
            )
          }
        }
        )



    },
    startFlake() {
      if (
        !this.$root.tools.snowflake.selected.content.length
      ) {
        console.log("GODDAMIN snowflake")
        let obj = {};
        obj.title = "";
        obj.level = 0;
        obj.content = "";
        obj.open = false;
        obj.children = [];
        this.$root.tools.snowflake.selected.content.push(obj);
      }
    }

  }
};
</script>

<template>
  <div class="subbar" v-if="mysnowflake">
    <input
      @blur="update()"
      type="text"
      v-model="this.mysnowflake.title"
    />
    <button class="btn" @click="$root.tools.snowflake.selected = null">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
  </div>
  <div class="scroller" v-if="mysnowflake">
    <template v-for="(flake, index) in this.$root.tools.snowflake.selected.content" :key="index">

    <div class="row">
        <div class="column" :style="!flake.open ? 'display:block' : ''">
          <div class="card">


            <button class="open-flake-button" @click="openflake(flake)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  d="M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2M8,10V14H16V10H8M8,16V20H16V16H8M8,4V8H16V4H8Z" />
              </svg>
            </button>
            <input class="title" v-model="flake.title" placeholder="title"
              @change="update()" />
            <MiniEditor :snowFlake="flake" v-model="flake.content" @updated="update()" />

            <button class="delete-flake-button" @click="deleteFlake(index)">
              <svg viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        </div>
        <Transition name="h-slide-fade">
          <div class="column" v-if="flake.open">
            <div class="card">
              <input class="title" v-model="flake.children[0].title" placeholder="title"
                @change="update()" />
              <MiniEditor :snowFlake="flake.children[0]" v-model="flake.children[0].content"
                @updated="update()" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[1].title" placeholder="title"
                @change="update()" />
              <MiniEditor :snowFlake="flake.children[1]" v-model="flake.children[1].content"
                @updated="update()" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[2].title" placeholder="title"
                @change="update()" />
              <MiniEditor :snowFlake="flake.children[2]" v-model="flake.children[2].content"
                @updated="update()" />
            </div>

            <button class="replaceButton" @click="replace(flake, index)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  d="M14.58,16.59L19.17,12L14.58,7.41L16,6L22,12L16,18L14.58,16.59M8.58,16.59L13.17,12L8.58,7.41L10,6L16,12L10,18L8.58,16.59M2.58,16.59L7.17,12L2.58,7.41L4,6L10,12L4,18L2.58,16.59Z" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>
</template>
  </div>
</template>

<style scoped>


.scroller {
  position: absolute;
  top: 40px;
  left: 0px;
  bottom: 30px;
  right: 0px;
  overflow-y: scroll;
  padding-bottom: 60px;
}

.card {
  position: relative;
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background-color: #fff;
  color: #000;
  margin: 10px;
}

.card .title {
  background: none;
  color: inherit;
  outline: none;
  border: 0;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.4rem;
}

.row {
  margin: 0 auto;
  max-width: 1000px;

}

.column {
  position: relative;
  width: 50%;
  display: inline-block;
  vertical-align: middle;
  padding: 11px;
  margin: 0 auto;
}

.open-flake-button {
  position: absolute;
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  right: -20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--accent2);
  color:#fff;
  border: 0px;
  border-radius: 20px;
  fill: currentColor;
}

.open-flake-button svg {
  width: 24px;
}

.open-flake-button:hover,
.open-flake-button:focus,
.open-flake-button:active {
  background-color: var(--accent1);
}

.open-flake-button:hover svg,
.open-flake-button:focus svg,
.open-flake-button:active svg {
  fill: currentColor
}

.replaceButton {
  position: absolute;
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  right: -20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--accent2);
  color: #fff;
  border: 0px;
  border-radius: 20px;
  fill: currentColor
}


.replaceButton:hover,
.replaceButton:focus,
.replaceButton:active {
  background-color: var(--accent1);
}

.replaceButton:hover svg,
.replaceButton:focus svg,
.replaceButton:active svg {
  fill: currentColor
}



.delete-flake-button {
  cursor: pointer;
  border: 0px;
  background: inherit;
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 0px;
  background-color: var(--danger);
  color: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;

}

.delete-flake-button svg {
  width: 16px;
  fill:currentColor
}

.delete-flake-button:hover,
.delete-flake-button:active,
.delete-flake-button:focus {
  background-color: var(--accent5);
  color:#fff;
}



.delete-flake-button:hover svg,
.delete-flake-button:active svg,
.delete-flake-button:focus svg {
  fill: currentColor
}

#toolbox {
  position: fixed;
  top: 50px;
  height: 40px;
  width: 100%;
  background-color: var(--mm-title-bar);
  text-align: right;
}

.titleinput {
  background-color: inherit;
  color: inherit;
  outline: none;
  border: none;
  position: absolute;
  left: 10px;
  top: 0px;
  height: 40px;
  width: calc(100% - 80px);
}

</style>

