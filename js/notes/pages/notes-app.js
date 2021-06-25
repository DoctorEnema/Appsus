import { notesService } from '../services/notes-service.js'
import notesList from '../cmps/notes-list.js'
import { eventBus } from '../../services/event-bus-service.js'
import notesSearch from '../cmps/notes-search.js'

export default {
    components: {
        notesList,
        notesSearch
    },
    template: `
        <section>
            <notes-search @filtered="setFilter"></notes-search>
            <button @click="createTxtNote()">Add New Note</button>
            <button @click="createImg()">Img Note</button>
            <notes-list @reloadNotes="loadNotes()" :notes="notesToShow" />
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
        }
    },
    methods: {
        loadNotes() {
            notesService.query()
                .then((notes) => this.notes = notes)
                .then(this.sortByPinned)
        },
        createTxtNote() {
            const note = notesService.createNote()
            notesService.addNote(note)
                .then(() => this.loadNotes())
        },
        createImg() {
            const note = notesService.createImgNote()
            notesService.addNote(note)
                .then(() => this.loadNotes())
        },
        sortByPinned() {
            this.notes.sort((x, y) => Number(y.isPinned) - Number(x.isPinned))
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const searchStr = this.filterBy.title.toLowerCase();
            const notesToShow = this.notes.filter(note => {
                return note.info.title.toLowerCase().includes(searchStr);
            });
            return notesToShow;
        },
    },
    created() {
        eventBus.$on('removeNote', note => {
            notesService.remove(note)
                .then(() => this.loadNotes())
        })
        eventBus.$on('saveNote', note => {
            notesService.save(note)
                .then(() => {
                    this.loadNotes()
                })
        })
        this.loadNotes()
    },
}