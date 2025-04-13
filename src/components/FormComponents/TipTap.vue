<template>
    <editor-content class="editor" :editor="editor" />
    <bubble-menu v-if="editor" :editor="editor" class="bubble-menu">
        <button @mousedown.prevent="setParagraph" :class="{ active: editor.isActive('paragraph') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-paragraph</title><path d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" /></svg>
        </button>
        <button @mousedown.prevent="setHeading(1)" :class="{ active: editor.isActive('heading', { level: 1 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-header-1</title><path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" /></svg>
        </button>
        <button @mousedown.prevent="setHeading(2)" :class="{ active: editor.isActive('heading', { level: 2 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-header-2</title><path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" /></svg>
        </button>
        <button @mousedown.prevent="setHeading(3)" :class="{ active: editor.isActive('heading', { level: 3 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-header-3</title><path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z" /></svg>
        </button>
        <button @mousedown.prevent="toggleBold" :class="{ active: editor.isActive('bold') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-bold</title><path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" /></svg>
        </button>
        <button @mousedown.prevent="toggleItalic" :class="{ active: editor.isActive('italic') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-italic</title><path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" /></svg>
        </button>
        <button @mousedown.prevent="toggleOrderedList" :class="{ active: editor.isActive('orderedList') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-numbered</title><path d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" /></svg>
        </button>
        <button @mousedown.prevent="toggleBulletList" :class="{ active: editor.isActive('bulletList') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-list-bulleted</title><path d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" /></svg>
        </button>
    </bubble-menu>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
    components: {
        EditorContent,
        BubbleMenu,
    },
    props: {
        content: {
            type: String,
            required: true,
        },
    },
    emits: ['update:content'],
    data() {
        return {
            editor: null,
        }
    },
    methods: {
        emitContent() {
            this.$emit('update:content', this.editor.getHTML())
        },
        setParagraph() {
            this.editor.chain().focus().setParagraph().run()
        },
        setHeading(level) {
            this.editor.chain().focus().setHeading({ level }).run()
        },
        toggleBold() {
            this.editor.chain().focus().toggleBold().run()
        },
        toggleItalic() {
            this.editor.chain().focus().toggleItalic().run()
        },
        toggleOrderedList() {
            this.editor.chain().focus().toggleOrderedList().run()
        },
        toggleBulletList() {
            this.editor.chain().focus().toggleBulletList().run()
        },
    },
    mounted() {
        this.editor = new Editor({
            content: this.content,
            extensions: [
                StarterKit.configure({
                    heading: {
                        levels: [1, 2, 3], // Enable H1, H2, H3
                    },
                }),
            ],
        })

        this.editor.on('blur', this.emitContent)
    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.destroy()
        }
    },
}
</script>
<style scoped>
.editor {
    max-width: 700px;
    padding: 2%;
    color: #fff;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 60px;
    border-radius: 2px;
    font-size: 18px;
    border-radius: 3px;  
}
.editor .tiptap {
    outline: none;
    padding: 40px;
    padding-top: 20px;
    margin: 10px;
    min-height: 700px;
    font-family: "Special Elite", system-ui;
    font-weight: 400;
    font-style: normal;
}
.editor .tiptap p:not(:first-of-type) {
    text-indent: 2em;
}
.editor .tiptap p:first-of-type::first-letter {
   /* font-size: 2em; */
}
.editor:focus-within {
    outline: none;
}
.bubble-menu {
    display: flex;
    gap: 2px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.bubble-menu svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}
.bubble-menu button {
    background: none;
    border: none;
    padding: 5px 5px;
    cursor: pointer;
}
.bubble-menu button.active {
    font-weight: bold;
    color: #007bff;
}
</style>