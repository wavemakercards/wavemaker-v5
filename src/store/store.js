import { reactive } from "vue";
export const store = reactive({
    FileManager: {
        fileHandle : null,
        jsonData : null
    },
    tools :{
        current: null,
        writer : {
            selectednode : null
        }
    }
});
