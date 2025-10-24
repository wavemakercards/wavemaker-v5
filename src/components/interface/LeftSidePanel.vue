<script>
import { store } from "@/store/store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div id="LeftSidePanel">
    <div class="header">
      <div>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>plus-box-outline</title>
          <path
            d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z"
          />
        </svg>
      </button>
            <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>plus-box-outline</title>
          <path
            d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z"
          />
        </svg>
      </button>
            <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>plus-box-outline</title>
          <path
            d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z"
          />
        </svg>
      </button>


      </div>
      <button class="pin" @click="store.interface.leftPanelPin= !store.interface.leftPanelPin" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="store.interface.leftPanelPin">
          <title>pin</title>
          <path
            d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="!store.interface.leftPanelPin">
          <title>pin-off</title>
          <path
            d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z"
          />
        </svg>
      </button>
    </div>
    <div class="content">
      <ul>
        <li>Filename</li>
        <li>
          Folder
          <ul>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>
              Folder
              <ul>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
                <li>Filename</li>
              </ul>
            </li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
          </ul>
        </li>
        <li>Filename</li>
        <li>Filename</li>
        <li>Filename</li>
        <li>Filename</li>
        <li>
          Folder
          <ul>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
            <li>Filename</li>
          </ul>
        </li>
        <li>Filename</li>
        <li>Filename</li>
        <li>Filename</li>
        <li>Filename</li>
      </ul>
    </div>
  </div>
</template>
