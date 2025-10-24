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
        modelValue: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'blur'],
    data() {
        return {
            editor: null,
        }
    },
    methods: {
        emitContent() {
            this.$emit('update:modelValue', this.editor.getHTML())
        },
        emitBlur() {
            this.$emit('blur')
        },
    },
    mounted() {
        this.editor = new Editor({
            content: this.modelValue,
            extensions: [StarterKit],
            editable: !this.disabled,
        })

        // Ensure emitContent is called when the editor content changes
        this.editor.on('update', this.emitContent)

        // Emit blur event when the editor loses focus
        this.editor.on('blur', this.emitBlur)
    },
    watch: {
        disabled(newValue) {
            if (this.editor) {
                this.editor.setOptions({ editable: !newValue })
            }
        },
    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.destroy()
        }
    },
}
</script>
<style>
.editor .tiptap {
    outline: none;
    min-height: 100px;
}
</style>