<script>
import TopToolBar from "@/components/interface/TopToolBar.vue";
import SideToolBar from "@/components/interface/SideToolBar.vue";
import MainArea from "@/components/interface/MainArea.vue";
import RightSidePanel from "@/components/interface/RightSidePanel.vue";
import LeftSidePanel from "@/components/interface/LeftSidePanel.vue";
export default {
  components: {
    TopToolBar,
    SideToolBar,
    MainArea,
    RightSidePanel,
    LeftSidePanel
  },
};
</script>

<template>
  <TopToolBar />
  <SideToolBar />
  <MainArea />
  <LeftSidePanel />
   <RightSidePanel />
    
</template>

<style>



</style>
