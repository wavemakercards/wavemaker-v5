<script>
export default {
  name: "CardViewer",
  components: {},
  props: {
    cardRef: {
      type: String
    },
  },
  data(){
    return {
      currentcard : null
    }
  },
  async mounted(){
    this.currentcard = await this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Cards.get(this.cardRef)))
  },
  methods: {
    editcard(id){
      this.$root.tools.cards.editcard = this.currentcard
      this.$root.modal = true
    }
  },

};
</script>

<template>
  <div class=""  @click="editcard(currentcard.uuid)" >
    <div v-if="!currentcard" class="card card-placeholder">
        No card ref provided so we need to have the "create" or "link" option
    </div>
    <div v-if="currentcard" class="card card-button" :class="currentcard.color">
      <h1 class="card-title">{{ currentcard.title }}</h1>
      <div class="card-description">{{ currentcard.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 15px 5px;
  padding: 10px;
  height: 100%;
}

.card-placeholder {
  color: #888;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;

  margin-bottom: 10px;
  text-align: left;
}

.card-title:empty:before{
  content: "..."
}

.card-description {
    font-size: 16px;

  margin-bottom: 20px;
  text-align: justify;
}

.card-description:empty:before{
  content: "..."
}

.card-button{
  width: 100%;
  cursor: pointer;
}

.card-button:hover{
  outline: 3px solid #ffffff;
}
</style>
