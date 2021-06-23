import { utilService } from "../../services/util-service.js"
import { storageService } from "../../services/async-storage-service.js"

const NOTES_KEY = 'notes'

export const notesService = {
    // createImgNote,
    // createTextNote,
    createNote,
    query,
}

const gNotes = createNotes()

function createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || notes.length) {
        notes = [
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    txt: 'Wow'
                },
            },
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    txt: 'wiwa'
                },
            },
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}

function query() {
    return storageService.query(NOTES_KEY)
}


function createNote() {
    return {
        type: 'noteTxt',
        info: {
            txt: ''
        }
    }
}

// function createTextNote() {
//     return {
//         type: 'NoteTxt',
//         isPinned: false,
//         info: {
//             txt: ''
//         },
//         style: {
//             backgroundColor: ''
//         }
//     }
// }

// function createImgNote() {
//     return {
//         type: 'NoteImg',
//         isPinned: false,
//         info: {
//             url: '',
//             title: '',
//         },
//         style: {
//             backgroundColor: ''
//         }
//     }
// }