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
  <div class="card">
    <div v-if="!currentcard" class="card-placeholder">
        No card ref provided so we need to have the "create" or "link" option
    </div>
    <div v-if="currentcard" class="card-content">
      <h1 class="card-title">{{ currentcard.title }}</h1>
      <div class="card-description">{{ currentcard.description }}</div>
      <button class="card-edit-button" @click="editcard(currentcard.uuid)">Edit Card</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 15px 5px;
  padding: 10px;
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

.card-content {
  width: 100%;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.card-title:empty:before{
  content: "..."
}

.card-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  text-align: justify;
}

.card-description:empty:before{
  content: "..."
}

.card-edit-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-edit-button:hover {
  background-color: #0056b3;
}
</style>
