<template>
    <div class="node" :style="{ paddingLeft: `${1.5 * depth}rem` }">
        <button @click="setExpanded(!expanded)">{{ expanded ? "▼" : "▶" }}</button>
        <span @click="junk(item.id)">{{ item.name }}</span>
        <button @click="deleteItem">X</button>
    </div>
</template>

<script>
export default {
    name: 'MyTreeItemRenderer',
    props: {
        item: Object,
        depth: Number,
        expanded: Boolean
    },
    emits: ['setExpanded'],
    methods: {
        setExpanded(value) {
            this.$emit('setExpanded', value);
        },
        deleteItem() {
          //  this.delete(this.item.id);
        },
        junk(x){
            console.log(x)
            this.$root.node=x
        }
    }
}
</script>

<style scoped>
.node{
    margin:2px ; 
    padding:10px;
    background-color:var(--accent2)
}
</style>