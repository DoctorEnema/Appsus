import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
            <button @click="removeNote()">Remove</button>
            <input v-if="title.isBeingEdited" v-model="note.info.title" type="text">
            <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
            <textarea v-if="vid.isBeingEdited" v-model="note.info.url"></textarea>
            <iframe v-else @dblclick="editVid()" :src="note.info.url"></iframe>
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
            vid: {
                isBeingEdited: false
            }
        }
    },
    methods: {
        editTitle() {
            this.title.isBeingEdited = true
        },
        editVid() {
            this.vid.isBeingEdited = true
        },
        updateNote() {
            eventBus.$emit('saveNote', this.note)
            this.title.isBeingEdited = false
            this.vid.isBeingEdited = false
        },
        removeNote() {
            eventBus.$emit('removeNote', this.note.id)
        },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.$emit('saveNote', this.note)
        },
    },
    computed: {
        editing() {
            if (this.title.isBeingEdited || this.vid.isBeingEdited) return true
        }
    }
}