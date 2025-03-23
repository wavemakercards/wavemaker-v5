<script>
/**
 * TODO : set up the tiptap "mini editor"
 */
export default {
  name: "CardEditor",
  data() {
    return {
      colorlist: [
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
    update(){
      this.$root.UpdateRecord("Cards", this.$root.tools.cards.editcard.uuid, this.$root.tools.cards.editcard) 
    }
},
};
</script>
<template>
    <div v-if="!$root.tools.cards.editcard"> 
            no card picked - so its gonna be link or new
            <button @click="$root.makeNewCard()">New Card</button>
    </div>
    <div v-if="$root.tools.cards.editcard"> 
  <div><span v-for="color in colorlist" :class="color"></span></div>
  <h1><input type="text" placeholder="Card Title" v-model="$root.tools.cards.editcard.title" @blur="update()" /></h1>
  <h2>Description</h2>
  <label><input type="checkbox"  v-model="$root.tools.cards.editcard.showdesc"  @blur="update()"/> Show on card</label>
  <p>
    <textarea placeholder="card summary" v-model="$root.tools.cards.editcard.description"  @blur="update()"></textarea>
  </p>
  <h2>Content</h2>
  <p>
    <textarea placeholder="card details" v-model="$root.tools.cards.editcard.content"  @blur="update()"></textarea>
  </p>
  <p></p>
</div>
</template>

<style scoped>
.cardcolor1 {
  display: inline-block;
  background-color: #fdfd96; /* Light Yellow */
  border: 1px solid #f0e68c;
  color: black; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
.cardcolor2 {
  display: inline-block;
  background-color: #ffb6c1; /* Light Pink */
  border: 1px solid #ff69b4;
  color: black; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
.cardcolor3 {
  display: inline-block;
  background-color: #add8e6; /* Light Blue */
  border: 1px solid #87ceeb;
  color: black; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
.cardcolor4 {
  display: inline-block;
  background-color: #90ee90; /* Light Green */
  border: 1px solid #32cd32;
  color: black; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
.cardcolor5 {
  display: inline-block;
  background-color: #ffa07a; /* Light Salmon */
  border: 1px solid #fa8072;
  color: black; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
.cardcolor6 {
  display: inline-block;
  background-color: #dda0dd; /* Plum */
  border: 1px solid #ba55d3;
  color: white; /* Best contrast */
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
</style>
