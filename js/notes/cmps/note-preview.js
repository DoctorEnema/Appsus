import noteTodo from "./note-todo.js"
import noteImg from "./note-img.js"
import noteTxt from "./note-txt.js"
import noteVideo from "./note-video.js"

export default {
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteTodo,
        noteVideo,
    },
    template: `
            <component class="note-preview" :note="note" :is=noteType></component>
    `,
    data() {
        return {

        }
    },
    computed: {
        noteType() {
            if (this.note.type === 'noteTxt') return 'note-txt'
            if (this.note.type === 'noteImg') return 'note-img'
            if (this.note.type === 'noteVideo') return 'note-video'
            if (this.note.type === 'noteTodo') return 'note-todo'
        }
    }
}
