import { reactive } from "vue";
export const store = reactive({
    currentNode: null,
    FileManager: {
        fileHandle : null,
        jsonData : null
    },
    tools :{
        current: null,
    }
});
