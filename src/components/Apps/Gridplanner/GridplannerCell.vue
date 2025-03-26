<template>

<VueDraggable
      :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
      :animation="150"
      group="gridplan"
    >
    <div
      class="list-group-card-item"
      v-for="(element, index) in modelValue"
      :key="index"
      >
         <CardViewer :cardRef="element.uuid" />
 
      <div class="clearInterfaceIconButton cardHandle">
        <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
          <path
            d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z"
          />
        </svg>
      </div>
      <button class="deleteIconButton" @click="deleteNote(index)" tabindex="0">
        <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
          <path
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
          />
        </svg>
      </button>
    </div>
  </VueDraggable>

  <button
    class="add-card"
    @click="addCard"
  >
    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
      <path
        d="M13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H20C21.11 4 22 4.89 22 6V13.81C21.12 13.3 20.09 13 19 13C15.69 13 13 15.69 13 19C13 19.34 13.04 19.67 13.09 20M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z"
      />
    </svg>
  </button>
</template>

<script>
import { VueDraggable } from "vue-draggable-plus";
import CardViewer from "@/components/Apps/Cardsdatabase/CardViewer.vue";
export default {
  name: "GridPlannerCell",
  emits: ["update:modelValue", "MakeChange"],
    components: {
    VueDraggable,
    CardViewer,
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "Cards",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  data() {
    return {
      drag: false,
      colWidth: 320,
    };
  },
  methods: {
    linkCard(newuuid, uuid) {
      var element = this.modelValue.find((x) => x.uuid === uuid);
      element.uuid = newuuid;
      this.updateDatabase();
    },
    deleteNote(index) {
      this.$swal({
        title: "DELETE",
        text: "this.$root.setlang.confirmmodal.noundo",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
        cancelButtonText: 'cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line
          this.modelValue.splice(index, 1);
          this.$emit("update:modelValue", this.modelValue);
          this.updateDatabase();
          this.$swal(
            "SUccess",
            "this.$root.setlang.confirmmodal.successfeedback",
            "success"
          );
        }
      });
    },
    addCard() {
      let obj = {};
      obj.uuid = this.$root.uuid();
      // eslint-disable-next-line
      this.modelValue.push(obj);
      this.$emit("update:modelValue", this.modelValue);
      this.updateDatabase();
    },
    updateDatabase() {
      this.$emit("MakeChange");
    },
  },
};
</script>

<style scoped>
.add-card {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  top: 0px;
  left: calc(50% - 20px);
  border-radius: 20px;
  border: 0px;
  padding: 10px;
  color: var(--accent2);
  background-color: #fff;

  border: 3px solid var(--accent2);
  cursor: pointer;
}

.add-card svg {
  position: absolute;
  top: 4px;
  left: 5px;
  width: 100%;

  fill: currentColor;
}

.list-group-card-item {
  position: relative;
}

.list-group-card-item:hover .deleteIconButton,
.list-group-card-item:hover .cardHandle {
  display: block;
}
.deleteIconButton {
 display: none;
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 5px;
  background-color: rgb(189, 0, 0);
  color: #fff;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
.deleteIconButton svg {
  fill: currentColor;
  width: 100%;
}
.cardHandle {
  display: none;
  position: absolute;
  top: -8px;
  left: -8px;
  padding: 5px;
  background-color: rgb(201, 101, 0);
  color: #fff;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
.cardHandle svg {
  fill: currentColor;
  width: 100%;
}
</style>
