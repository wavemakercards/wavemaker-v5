<script>
import CardEditor from "@/components/Apps/Cardsdatabase/CardEditor.vue"
export default {
    components:{
        CardEditor
    }
};
</script>

<template>
<div class="blackout" @click="$root.modal=false"></div>
<div class="centreme">
    <button @click="$root.modal=false" class="modalclose">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>
    </button>
 <CardEditor />
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
    color: #000;
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translate(-50%);
    padding: 50px;
    width: 90%;
    max-width: 720px;
    max-height: 85%;
    overflow: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.modalclose{
    border:0px;
    background: none;
    position: absolute;
    width: 40px;
    height : 40px;
    top:20px;
    right:20px;
    cursor:pointer
}

.modalclose:hover{
    color: var(--accent2) 
}
.modalclose svg{
    fill: currentColor;
}
</style>
