import { utilService } from "../../services/util-service.js"
import { storageService } from "../../services/async-storage-service.js"

const NOTES_KEY = 'notes'

export const notesService = {
    // createImgNote,
    // createTextNote,
    createNote,
    query,
    save,
    remove,
    addNote,
}

const gNotes = createNotes()

function createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: 'NOTE',
                    txt: 'Wow'
                },
                id: utilService.makeId()
            },
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: 'ETON',
                    txt: 'wiwa'
                },
                id: utilService.makeId()
            },
            {
                type: 'noteImg',
                isPinned: false,
                info: {
                    title: 'IMAGE',
                    url: 'https://lolisc.co.il/wp-content/uploads/2019/04/3_Yuumi_W1.jpg'
                },
                id: utilService.makeId()
            },
            {
                type: 'noteVideo',
                isPinned: false,
                info: {
                    title: 'DaBest',
                    url: 'https://www.youtube.com/embed/2-kNs9vVgUo'
                },
                id: utilService.makeId()
            }
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}

function query() {
    return storageService.query(NOTES_KEY)
}

function save(note) {
    return storageService.put(NOTES_KEY, note)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function addNote(note) {
    return storageService.post(NOTES_KEY, note)
}


function createNote() {
    return {
        type: 'noteTxt',
        info: {
            title: 'Title',
            txt: 'Paragraph'
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