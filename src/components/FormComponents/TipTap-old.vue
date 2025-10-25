<template>
 <div v-if="editor" class="container">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          Paragraph
        </button>
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          Bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          Italic
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          Strike
        </button>
        <button
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
        >
          Highlight
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          Left
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          Center
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          Right
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          Justify
        </button>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

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
            hilighter : false
        }
    },
    methods: {
        emitContent() {
            this.$emit('update:content', this.editor.getHTML())
        },
    },
    mounted() {
        this.editor = new Editor({
            content: this.content,
            extensions: [
               StarterKit,
        Highlight
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
#TipTapToolBar{
    background-color: #007bff;
    height: 50px;
    width: 100%;
}

.editor {
max-width: 800px;
    min-height: 50%;
    padding: 30px 50px;
    color: var(--fg2);
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 60px;
    border-radius: 2px;
    font-size: 18px;
    border-radius: 3px;  
    font-family: 'Merriweather', serif;
    font-weight: 100;
    background-color: var(--bg2);
}
.editor .tiptap {
    outline: none;
    padding: 40px;
    padding-top: 20px;
    margin: 10px;
    min-height: 700px;
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