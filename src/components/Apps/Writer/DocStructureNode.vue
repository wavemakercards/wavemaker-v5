<template>
    <div :style="{ paddingLeft: `${1 * depth}rem` }" class="node" :class="{ selected: item === store.currentNode }" >
        <div >


        <button v-if="item.children.length" @click="setExpanded(!expanded)">
            <svg v-if="!expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder</title><path d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" /></svg>
            
            <svg v-if="expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder-open-outline</title><path d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>
          </button>
        
        
        
        <span v-if="!item.children.length">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-document-outline</title><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" /></svg>
        </span>
        <span 
            class="nodename" 
            tabindex="0"
             @click="junk(item)"
        >
            {{ item.name }}
        </span>
        <button class="deletebtn" @click="deleteItem">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle-outline</title><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M16,10V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V10H16M13.5,6L14.5,7H17V9H7V7H9.5L10.5,6H13.5Z" /></svg>
        </button>
    </div>
    </div>
</template>

<script>
import { store } from "@/store/store.js";
export default {
    name: 'DocStructureNode',
    props: {
        item: Object,
        depth: Number,
        expanded: Boolean
    },
    data(){
        return{
            store
        }
    },
    emits: ['setExpanded'],
    methods: {
        setExpanded(value) {
            this.$emit('setExpanded', value);
        },
        deleteItem() {
        console.log("delete",this.item.id)
            //this.delete(this.item.id);
        },
        junk(x){
            console.log(x)
            this.store.currentNode=x
        }
    }
}
</script>

<style scoped>
.node{
    position: relative;
    display: flex;
    padding:5px;
    width: 100%;
    border-radius: 0 5px 5px 0;
}
.node:hover{
    background-color:var(--accent2)
}
.nodename{
    display: inline-block;
    padding: 5px;

}
.selected{
    background-color:var(--accent1);
}

.nodename:focus{
    font-weight: bold;
}

.node button{
    cursor: pointer;
    background: none;
    border:0px;
    color: currentColor;
}

.node button svg,
.node span svg{
    padding-top:1px;
    width: 1.3rem;
    height: 1.3rem;
    fill: currentColor;
}
.node .deletebtn{
    position: absolute;
    right: 0;
}

.node .deletebtn:hover{
color: var(--danger)
}
</style>