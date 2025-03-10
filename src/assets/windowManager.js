const windowManager = {
    data() {
        return {
            windowID: null,
            ParentWindow : null
        }
    },
    methods: {
        openNewWindow(url = window.location.href) {
            url = url + "?parentid=" + this.windowID;
            const newWindow = window.open(url, '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
            newWindow.onload = function() {
                const newUrl = new URL(newWindow.location);
                newUrl.searchParams.delete('parentid');
                newWindow.history.replaceState(null, '', newUrl);
            };
          }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("URL Params", urlParams);
        this.ParentWindow = urlParams.get('parentid');
        console.log("Parent Window", this.ParentWindow);
        this.windowID = this.uuid();
    },
}
export default windowManager