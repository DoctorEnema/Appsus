import { eventBus } from "../../services/event-bus-service.js";

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
            
                <input @blur="updateNote()" v-if="title.isBeingEdited" v-model="note.info.title" type="text" ref="noteTitle">
                <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
                <textarea @blur="updateNote()" v-if="paragraph.isBeingEdited" v-model="note.info.txt" ref="noteBody"></textarea>
                <p v-else @dblclick="editParagraph()" >{{note.info.txt}}</p>
                <div class="note-btns">
                    <button class="pin" @click="togglePinNote()"></button>
                    <button class="color">
                        <input @change="updateNote()" v-model="note.color" type="color">
                    </button>
                    <button class="remove" @click="removeNote()"></button>
                    <button class="save" v-if="editing" @click="updateNote()"></button>
                    <button class="edit" v-else @click="editMode()"></button>
                </div>
        </section>
    `,
    data() {
        return {
            title: {
                isBeingEdited: false
            },
            paragraph: {
                isBeingEdited: false
            }
        }
    },
    methods: {
        updateNote() {
            eventBus.$emit('saveNote', this.note)
            this.title.isBeingEdited = false
            this.paragraph.isBeingEdited = false
        },
        removeNote() {
            eventBus.$emit('removeNote', this.note.id)
        },
        editParagraph() {
            this.paragraph.isBeingEdited = true
            setTimeout(() => this.$refs.noteBody.focus())
        },
        editTitle() {
            this.title.isBeingEdited = true
            setTimeout(() => this.$refs.noteTitle.focus())
        },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.$emit('saveNote', this.note)
        },
        editMode() {
            this.title.isBeingEdited = true
            this.paragraph.isBeingEdited = true
        }
    },
    computed: {
        editing() {
            if (this.title.isBeingEdited || this.paragraph.isBeingEdited) return true
        }
    }
}