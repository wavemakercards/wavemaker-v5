/**
 * This file is a Vue mixin that can be used to manage child windows.
 * It provides methods to open new windows and close all child windows when the main window is closed.
 * It also removes the parentid query parameter from the child window's URL.
 * If you do NOT want something visible in the child window you should v-if="!toolbarheight"
 */

const windowManager = {
  data() {
    return {
      windowID: null,
      parentID: null,
      toolbarheight: 50,
      childWindows: [], // Array to keep track of child windows
    };
  },
  methods: {
    openNewWindow() {
      let tool = "";
      let selected = "";
      if (this.$root.currentTool) {
        tool = this.$root.currentTool;
        if (this.$root.tools[this.$root.currentTool].selected) {
          selected = this.$root.tools[this.$root.currentTool].selected.uuid;
          console.log(selected)
        }
      }

      let url = window.location.href;
      url = url + "?parentid=" + this.windowID;
      url = url + "&dbname=" + this.$root.databaseName;
      url = url + "&tool=" + tool;
      url = url + "&selected=" + selected;
      const newWindow = window.open(
        url,
        "_blank",
        "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600"
      );
      this.childWindows.push(newWindow); // Add the new window to the array
      newWindow.onload = function () {
        const newUrl = new URL(newWindow.location);
   //     newUrl.search = ""; // Clear all query parameters
    //    newWindow.history.replaceState(null, "", newUrl);
      };
    },
    closeChildWindows() {
      this.childWindows.forEach((win) => {
        if (win && !win.closed) {
          win.close();
        }
      });
      // this.$root.closeProject()
      this.childWindows = []; // Clear the array
    },
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);

    for (const [key, value] of urlParams.entries()) {
      console.log(`${key}: ${value}`);
    }
    this.parentID = urlParams.get("parentid");
    this.$root.databaseName = urlParams.get("dbname");
    this.$root.currentTool = urlParams.get("tool");
    this.$root.urlSelected = urlParams.get("selected");


    console.log("SubWindow", this.parentID)
    if (this.parentID) {
      this.toolbarheight = 0;
    }

    this.windowID = this.uuid();

    // Add an event listener to close child windows when the main window is closed
    window.addEventListener("beforeunload", this.closeChildWindows);
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener("beforeunload", this.closeChildWindows);
  },
};
export default windowManager;
