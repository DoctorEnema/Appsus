import { eventBus } from "../../services/event-bus-service.js";

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
            <button @click="removeNote()">Remove</button>
                <input v-if="title.isBeingEdited" v-model="note.info.title" type="text">
                <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
                <textarea v-if="paragraph.isBeingEdited" v-model="note.info.txt"></textarea>
                <p v-else @dblclick="editParagraph()" >{{note.info.txt}}</p>
                <button v-if="editing" @click="updateNote()">Save</button>
                <input v-model="note.color" type="color">
                <button @click="updateNote()">Update</button>
                <button @click="togglePinNote()">Pin</button>
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
        },
        editTitle() {
            this.title.isBeingEdited = true
        },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.$emit('saveNote', this.note)
        }
    },
    computed: {
        editing() {
            if (this.title.isBeingEdited || this.paragraph.isBeingEdited) return true
        }
    }
}