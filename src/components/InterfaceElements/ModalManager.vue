<script>

export default {
  methods: {},
};
</script>

<template>
<div class="blackout" @click="$root.modal=false"></div>
<div class="centreme">
    Hello
</div>
</template>

<style scoped>
.blackout{
    position: fixed;
    top:0px;
    left:0px;
    bottom:0px;
    right:0px;
    background-color: #000000aa;
}
.centreme{
    background-color: #fff;
    margin-top:60px;
    padding: 20px;
    min-width: 320px;
    min-height: 200px;
}
</style>
