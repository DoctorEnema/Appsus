import { notesService } from '../services/notes-service.js'
import notesList from '../cmps/notes-list.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    components: {
        notesList
    },
    template: `
        <section>
            <button @click="createTxtNote()">Add New Note</button>
            <notes-list @reloadNotes="loadNotes()" :notes="notes" />
        </section>
    `,
    data() {
        return {
            notes: [],
        }
    },
    methods: {
        loadNotes() {
            notesService.query()
                .then((notes) => this.notes = notes)
        },
        createTxtNote() {
            const note = notesService.createNote()
            notesService.addNote(note)
                .then(() => this.loadNotes())

        }
    },
    created() {
        eventBus.$on('removeNote', note => {
            notesService.remove(note)
                .then(() => this.loadNotes())
        })
        eventBus.$on('saveNote', note => {
            notesService.save(note)
                .then((note) => {

                })
        })
        this.loadNotes()
    }

}