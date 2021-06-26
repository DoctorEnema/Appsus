import { eventBus } from "../../services/event-bus-service.js";

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
                <input @blur="updateNote()" v-if="title.isBeingEdited" v-model="note.info.title" type="text" ref="noteTitle">
                <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
                <textarea @blur="updateNote()" v-if="img.isBeingEdited" v-model="note.info.url" ref="noteImg"></textarea>
                <img v-else @dblclick="editImg()" :src="note.info.url" :alt="note.info.title">
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
            img: {
                isBeingEdited: false
            }
        }
    },
    methods: {
        editTitle() {
            this.title.isBeingEdited = true
            setTimeout(() => this.$refs.noteTitle.focus())
        },
        editImg() {
            this.img.isBeingEdited = true
            setTimeout(() => this.$refs.noteImg.focus())
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
        editMode() {
            this.title.isBeingEdited = true
            this.img.isBeingEdited = true
        }
    },
    computed: {
        editing() {
            if (this.title.isBeingEdited || this.img.isBeingEdited) return true
        }
    }
}