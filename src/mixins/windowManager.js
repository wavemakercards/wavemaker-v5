/**
 * This file is a Vue mixin that can be used to manage child windows.
 * It provides methods to open new windows and close all child windows when the main window is closed.
 * It also removes the parentid query parameter from the child window's URL.
 * If you do NOT want something visible in the child window you should v-if="!mainwindow"
 */

const windowManager = {
    data() {
        return {
            windowID: null,
            parentID : null,
            mainwindow: true,
            childWindows: [] // Array to keep track of child windows
        }
    },
    methods: {
        openNewWindow(url = window.location.href) {
            url = url + "?parentid=" + this.windowID;
            url = url + "&dbname=" + this.$root.databaseName;
            const newWindow = window.open(url, '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
            this.childWindows.push(newWindow); // Add the new window to the array
            newWindow.onload = function() {
                const newUrl = new URL(newWindow.location);
                newUrl.searchParams.delete('parentid');
                newUrl.searchParams.delete('dbname');
                newWindow.history.replaceState(null, '', newUrl);
            };
        },
        closeChildWindows() {
            this.childWindows.forEach(win => {
                if (win && !win.closed) {
                    win.close();
                }
            });
           // this.$root.closeProject()
            this.childWindows = []; // Clear the array
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.parentID = urlParams.get('parentid');
        this.$root.databaseName = urlParams.get('dbname');
        if(this.parentID){
            this.mainwindow = false;
        }
        this.windowID = this.uuid();

        // Add an event listener to close child windows when the main window is closed
        window.addEventListener('beforeunload', this.closeChildWindows);
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        window.removeEventListener('beforeunload', this.closeChildWindows);
    }
}
export default windowManager