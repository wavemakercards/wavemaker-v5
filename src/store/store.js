import { reactive } from "vue";
export const store = reactive({
    isProjectLoaded : false,
    interface : {
        leftPanelVisible : true,
        rightPanelVisible : true
    }
});
