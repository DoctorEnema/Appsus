import { notesService } from '../services/notes-service.js'
import notesList from '../cmps/notes-list.js'

export default {
    components: {
        notesList
    },
    template: `
        <section>
            <h1>Notes</h1>
            <notes-list :notes="notes" />
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
        }
    },
    created() {
        this.loadNotes()
    }

}