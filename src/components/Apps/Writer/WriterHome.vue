<script>
import DocStructure from "@/components/Apps/Writer/DocStructure.vue";
import FileEditor from "@/components/Apps/Writer/FileEditor.vue";
import BookEditor from "@/components/Apps/Writer/BookEditor.vue";

export default {
  name: "WriterHome",
  components: {
    DocStructure,
    FileEditor,
    BookEditor,
  },
  data() {
    return {
      lhshidden: false,
      rhshidden: false,
    };
  },
  computed: {
    displaylist() {
      return this.$root.syncdb.Writer.sort(
        (a, b) => new Date(b.lastupdated) - new Date(a.lastupdated)
      );
    },
  },
  methods: {
    addNewBook() {
      let template = JSON.parse(JSON.stringify(this.$root.writerTemplate));
      template.uuid = this.$root.uuid();
      this.$root.AddRecord("Writer", template);
    },
  },
};
</script>

<template>
  <div v-if="!$root.tools.writer.selected">
    <div id="writerHome" :class="{ mainwindow: $root.mainwindow }">
      <div class="hero">
        <button @click="addNewBook">Add a New Book</button>
      </div>
      <div class="grid">
        <div class="gridcard" v-for="(book, bi) in displaylist" :key="bi">
          <div class="book-3d" @click="$root.tools.writer.selected = book">
            <div class="book-3d__inner">
              <img
                v-if="book.cover"
                :src="book.cover"
                class="book-3d__cover"
                :alt="book.title"
              />
              <img
                v-else
                class="book-3d__cover"
                src="/resources/bookcover.png"
                :alt="book.title"
              />
            </div>
          </div>

          <details>
            <summary>{{ book.title }}</summary>
            <p>by {{ book.author }}</p>
            <p>{{ book.description }}</p>
            <p>{{ book.lastupdated }}</p>
          </details>
        </div>
      </div>
    </div>
  </div>
  <div v-if="$root.tools.writer.selected">
    <div
    id="FileEditor"
      :class="{
        lhsmain: lhshidden,
        rhsmain: rhshidden,
        mainwindow: $root.mainwindow,
      }"
    >

      <FileEditor
        v-if="$root.tools.writer.selectednode"
        :key="$root.tools.writer.selectednode"

      />
      <BookEditor v-if="!$root.tools.writer.selectednode" />
    </div>

    <div
      class="lhs"
      :class="{ lhshidden: lhshidden, mainwindow: $root.mainwindow }"
    >
      <button @click="lhshidden = !lhshidden" class="pinbtn lhsbtn">
   <svg v-if="lhshidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
   <svg v-if="!lhshidden"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-open</title><path d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" /></svg>
     

</button>
      <DocStructure />
    </div>

    <div
      class="rhs"
      :class="{ rhshidden: rhshidden, mainwindow: $root.mainwindow }"
    >
      <button @click="rhshidden = !rhshidden" class="pinbtn rhsbtn">

   <svg  v-if="rhshidden"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
   <svg v-if="!rhshidden" style="rotate: 180deg;"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-open</title><path d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" /></svg>
      </button></div>
  </div>
</template>

<style scoped>
.pinbtn{
  border:0px;
  background-color: var(--bg2);
  color: var(--fg2);
  cursor: pointer;
  &:hover{
    background-color: var(--info);
    color: var(--info-fg);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  svg{
    width: 20px;
  }
}

.lhs {
  width: 320px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  transition: left 100ms ease-in;
}

.lhs:hover,
.lhs:focus-within {
}
.lhshidden {
  left: -290px !important;
}

.lhsbtn {
  position: absolute;
  z-index: 10000;
  top: 2px;
  left: 290px;
  padding: 2px;
  width: 30px;
    border-left: 2px solid var(--fg2);
      border-radius: 0px 5px 5px 0px;
}

.rhsbtn {
  position: absolute;
  z-index: 10000;
  top: 2px;
  right: 290px;
  padding: 2px;
  width: 30px;
    border-right: 2px solid var(--fg2);
    border-radius: 5px 0px 0px 5px;
}

.rhs {
  width: 320px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  overflow: auto;
  transition: right 100ms ease-in;
}

.rhs:hover,
.rhs:focus-within {
}

.rhshidden {
  right: -290px !important;
}

.main {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 320px;
  left: 320px;
  overflow: auto;
  padding: 10px;
}
.lhsmain {
  left: 0px !important;
}

.rhsmain {
  right: 0px !important;
}

#writerHome {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}



/**Book */
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .gridcard {
    background-color: var(--bg3);
    color: var(--fg3);
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
      background-color: var(--info);
      color: var(--info-fg);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }
  .book-3d {
    --book-thickness: 14px;
    --cover-color: #121212;
    perspective: 1000px;
    max-width: 100px;
    margin: 0 auto;
    cursor: pointer;
  }

  .book-3d__inner {
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(-25deg);
  }

  /* Book Pages */
  .book-3d__inner::before {
    position: absolute;
    content: " ";
    left: 100%;
    top: 1%;
    width: calc(var(--book-thickness) * 2);
    height: 98%;
    transform: translate(-55%, 0) rotateY(90deg);
    background: linear-gradient(
      90deg,
      #fff 0%,
      hsl(0, 0%, 94%) 5%,
      #fff 10%,
      hsl(0, 0%, 94%) 15%,
      #fff 20%,
      hsl(0, 0%, 94%) 25%,
      #fff 30%,
      hsl(0, 0%, 94%) 35%,
      #fff 40%,
      hsl(0, 0%, 94%) 45%,
      #fff 50%,
      hsl(0, 0%, 94%) 55%,
      #fff 60%,
      hsl(0, 0%, 94%) 65%,
      #fff 70%,
      hsl(0, 0%, 94%) 75%,
      #fff 80%,
      hsl(0, 0%, 94%) 85%,
      #fff 90%,
      hsl(0, 0%, 94%) 95%,
      #fff 100%
    );
  }

  /* Rear Cover */
  .book-3d__inner::after {
    content: "";
    position: absolute;
    top: 0;
    left: 1%;
    width: 100%;
    height: 100%;
    transform: translateZ(calc(var(--book-thickness) * -1));
    background-color: var(--cover-color);
    border-radius: 0 2px 2px 0;
    box-shadow: -10px 0 50px 10px rgba(0, 0, 0, 0.3);
  }

  .book-3d__cover {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0px 2px 2px 0px;
    transform: translateZ(var(--book-thickness));
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  }
}

#FileEditor{
  position: absolute;
  top:0px;
  left:340px;
  right:340px;
  bottom:0px;
  overflow-y: auto;
}
</style>
