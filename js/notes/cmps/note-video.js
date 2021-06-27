import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['note'],
    template: `
        <section :style="{backgroundColor:note.color}">
            <input  @blur="updateNote()" v-if="title.isBeingEdited" v-model="note.info.title" type="text" ref="noteTitle">
            <h2 v-else @dblclick="editTitle()">{{note.info.title}}</h2>
            <textarea @blur="updateNote()" v-if="vid.isBeingEdited" v-model="note.info.url" ref="noteVid"></textarea>
            <iframe v-else :src="note.info.url"></iframe>
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
            vid: {
                isBeingEdited: false
            }
        }
    },
    methods: {
        editTitle() {
            this.title.isBeingEdited = true
            setTimeout(() => this.$refs.noteTitle.focus())
        },
        editVid() {
            this.vid.isBeingEdited = true
            setTimeout(() => this.$refs.noteVid.focus())
        },
        updateNote() {
            eventBus.$emit('saveNote', this.note)
            this.title.isBeingEdited = false
            this.vid.isBeingEdited = false
            eventBus.$emit('show-msg', { type: 'success', txt:'Saved!' })
        },
        removeNote() {
            eventBus.$emit('removeNote', this.note.id)
            eventBus.$emit('show-msg', { type: 'success', txt:'Removed!' })
        },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.$emit('saveNote', this.note)
            eventBus.$emit('show-msg', { type: 'success', txt:'Pinned!' })
        },
        editMode() {
            this.title.isBeingEdited = true
            this.vid.isBeingEdited = true
        }
    },
    computed: {
        editing() {
            if (this.title.isBeingEdited || this.vid.isBeingEdited) return true
        }
    }
}