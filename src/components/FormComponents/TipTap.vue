<template>
    <editor-content class="editor" :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
    components: {
        EditorContent,
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
        }
    },
    mounted() {
        this.editor = new Editor({
            content: this.content,
            extensions: [StarterKit],
        })

        // Ensure emitContent is called when the editor content changes
        this.editor.on('update', this.emitContent)
    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.destroy()
        }
    },
}
</script>
<style>
.editor {
    max-width: 700px;
    background-color: #00000022;
    padding: 10px;
    color: #efefef;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 2px;
    font-size: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
</style>