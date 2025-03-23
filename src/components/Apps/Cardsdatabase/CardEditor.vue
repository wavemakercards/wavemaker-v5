<script>
/**
 * TODO : set up the tiptap "mini editor"
 */
export default {
  name: "CardEditor",
  data() {
    return {
      colorlist: [
        "cardcolor0",
        "cardcolor1",
        "cardcolor2",
        "cardcolor3",
        "cardcolor4",
        "cardcolor5",
        "cardcolor6",
      ],
    };
  },
  methods: {
    update() {
      this.$root.UpdateRecord(
        "Cards",
        this.$root.tools.cards.editcard.uuid,
        this.$root.tools.cards.editcard
      );
    },
    setColor(c) {
      console.log(c);
      this.$root.tools.cards.editcard.color = c;
      this.update();
    },
  },
};
</script>
<template>
  <div v-if="!$root.tools.cards.editcard">
    no card picked - so its gonna be link or new
    <button @click="$root.makeNewCard()">New Card</button>
  </div>
  <div
    v-if="$root.tools.cards.editcard"
    class="card"
    :class="$root.tools.cards.editcard.color"
  >
    <div>
      <button
        v-for="color in colorlist"
        class="colorbtn"
        :class="color"
        @click="setColor(color)"
      ></button>
    </div>
    <h1>
      <input
        type="text"
        placeholder="Card Title"
        v-model="$root.tools.cards.editcard.title"
        @blur="update()"
      />
    </h1>
    <h2>Description</h2>
    <label
      ><input
        type="checkbox"
        v-model="$root.tools.cards.editcard.showdesc"
        @blur="update()"
      />
      Show on card</label
    >
    <p>
      <textarea
        placeholder="card summary"
        v-model="$root.tools.cards.editcard.description"
        @blur="update()"
      ></textarea>
    </p>
    <h2>Content</h2>
    <p>
      <textarea
        placeholder="card details"
        v-model="$root.tools.cards.editcard.content"
        @blur="update()"
      ></textarea>
    </p>
    <p></p>
  </div>
</template>

<style scoped>
.card{
  padding: 20px;
  border-radius: 10px;
}</style>
