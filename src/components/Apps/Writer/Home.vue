<script>
import DocStructure from "@/components/Apps/Writer/DocStructure.vue";
import FileEditor from "@/components/Apps/Writer/FileEditor.vue";
import BookEditor from "@/components/Apps/Writer/BookEditor.vue";

export default {
  name: "WriterHome",
  components: {
    DocStructure,
    FileEditor,
    BookEditor
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
    }
  },
};
</script>

<template>
  <div v-if="!$root.tools.writer.selected">
    <div class="writer-home">
      <button @click="addNewBook">Add a New Book</button>
      <div class="gridcard-grid">
        <div class="gridcard" v-for="(book, bi) in displaylist" :key="bi">
          <div class="book-3d">
            <div class="book-3d__inner">
              <img
                class="book-3d__cover"
                src="/resources/bookcover.png"
                :alt="book.title"
              />
            </div>
          </div>
          <h2>{{ book.title }}</h2>
          <p>by {{ book.author }}</p>
          <p>{{ book.description }}</p>
          <p>{{ book.lastupdated }}</p>
          <button @click="$root.tools.writer.selected = book.uuid">
            Open This Book
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="$root.tools.writer.selected">
    <div class="lhs">
      <DocStructure />
    </div>
    <div class="main">


   <FileEditor  v-if="$root.tools.writer.selectednode"/>
   <BookEditor v-if="!$root.tools.writer.selectednode"/>

    </div>
    <div class="rhs">RHS</div>
  </div>
</template>

<style scoped>
.lhs {
  min-width: 320px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  overflow: auto;

}
.rhs {
  min-width: 320px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  overflow: auto;

}
.main {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 320px;
  left: 320px;
  overflow: auto;

}

.gridcard-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/**Book */
.writer-home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}

.book-3d {
  --book-thickness: 14px;
  --cover-color: #121212;
  perspective: 1000px;
  max-width: 100px;
  margin: 0 auto;
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
</style>
