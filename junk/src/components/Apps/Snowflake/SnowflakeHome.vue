<script>
import SnowflakeEditor from '@/components/Apps/Snowflake/SnowflakeEditor.vue';
export default {
  name: "SnowflakeHome",
  components:{
    SnowflakeEditor
  }
};
</script>

<template>
  <div v-if="!$root.tools.snowflake.selected" class="snowflakes">


      <button @click="$root.tools.snowflake.selected = item"  v-for="(item, i) in this.$root.syncdb.Snowflake">
        <svg class="icon" viewBox="0 0 24 24">
          <title>snowflake</title>
          <path
            d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"
          />
          </svg>
        <div>{{ item.title }}</div>
      </button>
      <button @click="$root.makeSnowflake()" class="add">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>
        <div>Add</div></button>

  </div>

  <div v-if="$root.tools.snowflake.selected">
    <SnowflakeEditor />
  </div>

</template>

<style scoped>

.snowflakes {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.snowflakes button {
  padding: 10px;
  background-color: var(--accent2);
  color:#fff;
  fill:#fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  height: 150px;
  border: 1px solid #ffffff00;
}

.snowflakes button:hover {
  background-color: #e0e0e0;
  color: #000;
  border: 4px solid #ffffffff;
}
.snowflakes button .icon{
  width:50px;
  height:50px;
}
button.add{
  background-color: var(--accent6);
  font-size: 24px;
}
</style>
