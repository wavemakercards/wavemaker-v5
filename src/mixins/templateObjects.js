const templateObjects = {
  data() {
    return {
      SettingsTemplate: {
        documentprefs: {
          // need to trim a space from the formatted css
          align: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-align"
            )
          ),
          fontsize: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-fontsize"
            )
          ),
          lspacing: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-lspacing"
            )
          ),
          indentation: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-indentation"
            )
          ),
          pspacing: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-pspacing"
            )
          ),
          page: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-page"
            )
          ),
          font: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-font"
            )
          ),
          color: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-color"
            )
          ),
          bgcolor: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-bgcolor"
            )
          ),
          h1align: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-h1align"
            )
          ),
          h2align: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-h2align"
            )
          ),
          h3align: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-h3align"
            )
          ),
          h4align: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--pageEditor-h4align"
            )
          ),
          distractionfree_font: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--distractionfree-font"
            )
          ),
          distractionfree_bg: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--distractionfree-bg"
            )
          ),
          distractionfree_fg: this.dotrim(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--distractionfree-fg"
            )
          ),
          typesound: false,
          caretfocus: false,
        },
      },
      writerTemplate: {
        title: "Another Great Novel",
        author: "A.N. Author",
        description: " ... ",
        files: [],
      },
      fileTemplate: {
        title: "New Section",
        content: "",
        notes: [],
      },
    };
  },
  methods: {
    dotrim(result) {
      if (result[0] === " ") {
        result = result.substring(1);
      }

      return result;
    },
    async makeNewCard(existingid) {
      let newId = this.$root.uuid(); // use the same uuid to link them
      if (existingid) {
        newId = existingid;
      }
      let obj = {};
      obj.uuid = newId;
      obj.title = "";
      obj.description = "";
      obj.showdesc = false;
      obj.content = "";
      obj.labels = [];
      obj.images = [];
      obj.style = "";
      obj.options = {};
      obj.color = "cardcolor0";

      console.log(obj);
      await this.$root.AddRecord("Cards", obj);
      this.$root.modal = true;
      this.$root.tools.cards.selected = obj;
    },
    async makeMindmap() {
      let newId = this.$root.uuid(); // use the same uuid to link them
      let obj = {};
      obj.uuid = newId;
      obj.title = "New Mindmap";
      obj.description = ""; 
      obj.content = {
        links : [],
        nodes : {}
      }
      await this.$root.AddRecord("Mindmap", obj);
      this.$root.tools.mindmap.selected = obj;
    },
    async makeTimeline() {
      let newId = this.$root.uuid(); // use the same uuid to link them
      let obj = {};
      obj.uuid = newId;
      obj.title = '';
      obj.description = ''; 
      obj.content = {
        items : []
      }
      await this.$root.AddRecord("Timeline", obj);
      this.$root.tools.timeline.selected = obj;
    },
    async makeGridplanner() {
      let newId = this.$root.uuid(); // use the same uuid to link them
      let obj = {};
      obj.uuid = newId;
      obj.title = '';
      obj.description = ''; 
      obj.content = { headers: [], rows: [] }
      await this.$root.AddRecord("Gridplanner", obj);
      this.$root.tools.gridplanner.selected = obj;
    },
    async makeSnowflake() {
      let newId = this.$root.uuid(); // use the same uuid to link them
      let obj = {};
      obj.uuid = newId;
      obj.title = '';
      obj.description = ''; 
      obj.content = []
      await this.$root.AddRecord("Snowflake", obj);
      this.$root.tools.snowflake.selected = obj;
    },
  },
};
export default templateObjects;
