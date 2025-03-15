
  <script>
  import draggable from "vuedraggable";
  import { store } from "@/store/store.js";
  export default {
    props: {
      files: {
        required: true,
        type: Array
      }
    },
    components: {
      draggable
    },
    data() {
    return {
      store,
    };
  },
    name: "DocStructureNode"
  };
  </script>

<template>
    <draggable
      class="dragArea"
      tag="ul"
      :list="files"
      :group="{ name: 'g1' }"
      item-key="name"
    >
      <template #item="{ element }">
        <li class="node">
            <button @click="element.open = !element.open" class="toggle">
                <svg v-if="!element.open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Closed</title><path d="M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M9.71,18L8.29,16.59L12.88,12L8.29,7.41L9.71,6L15.71,12L9.71,18Z" /></svg>
                <svg v-if="element.open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down-box</title><path d="M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M12,15.71L6,9.71L7.41,8.29L12,12.88L16.59,8.29L18,9.71L12,15.71Z" /></svg>
            </button>
            <button class="labelbtn" :class="{ 'selected': store.tools.writer.selectednode === element }" @click="store.tools.writer.selectednode =  element">
                {{ element.name }}
            </button>

          <DocStructureNode v-if="element.open" :files="element.files" />
        </li>
      </template>
    </draggable>
  </template>

  <style scoped>
  .node{
    color: #fff;
  }

  .labelbtn{
    text-align: left;
    color: #fff;
    border: 0px;
    padding: 5px;
    cursor: pointer;
    background:none;
    display: inline-block;
    width: calc(100% - 24px);
  }

  button:hover, 
  button:active, 
  button:focus{
    background-color: var(--accent4);
  } 
  .dragArea {
    min-height: 30px;
  }

ul, li ul{
  margin: 0;
  padding: 0;
  min-height: 24px;
}

 li ul li{
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 10px;
}


.selected{
    background-color: var(--accent2);
    color: #fff;
}

ul:empty{
    background-color: #ffffff11;
    margin:4px;
    padding: 5px;
    font-size: 0.8rem;
    min-height: auto;
    color: #cccccc77
}
ul:empty::before{
    content: '...drop here'
}

.toggle{
    color: currentColor;
    text-align: left;
    border: 0px;
    padding: 2px;
    cursor: pointer;
    display: inline-block;
    fill: currentColor;
    width:24px;
    height: 24px;
    background:none;
}

.toggle svg{
    fill: currentColor;
}
  </style>