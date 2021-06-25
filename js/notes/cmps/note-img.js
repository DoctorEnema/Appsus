import { eventBus } from "../../services/event-bus-service.js";

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
        <button @click="removeNote()">Remove</button>
                <input v-if="title.isBeingEdited" v-model="note.info.title" type="text">
                <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
                <textarea v-if="img.isBeingEdited" v-model="note.info.url"></textarea>
                <img v-else @dblclick="editImg()" :src="note.info.url" :alt="note.info.title"></img>
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
            img: {
                isBeingEdited: false
            }
        }
    },
    methods: {
        editTitle() {
            this.title.isBeingEdited = true
        },
        editImg() {
            this.img.isBeingEdited = true
        },
        updateNote() {
            eventBus.$emit('saveNote', this.note)
            this.title.isBeingEdited = false
            this.img.isBeingEdited = false
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
            if (this.title.isBeingEdited || this.img.isBeingEdited) return true
        }
    }
}