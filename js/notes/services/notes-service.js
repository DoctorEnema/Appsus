import { utilService } from "../../services/util-service.js"
import { storageService } from "../../services/async-storage-service.js"

const NOTES_KEY = 'notes'

export const notesService = {
    // createImgNote,
    // createTextNote,
    query,
    save,
    remove,
    addNote,
    createTxtNote,
    createImgNote,
    createTodoNote,
    createVidNote,
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
                id: utilService.makeId(),
                color: ''
            },
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: 'ETON',
                    txt: 'wiwa'
                },
                id: utilService.makeId(),
                color: ''
            },
            {
                type: 'noteImg',
                isPinned: true,
                info: {
                    title: 'IMAGE',
                    url: 'https://lolisc.co.il/wp-content/uploads/2019/04/3_Yuumi_W1.jpg'
                },
                id: utilService.makeId(),
                color: ''
            },
            {
                type: 'noteVideo',
                isPinned: false,
                info: {
                    title: 'DaBest',
                    url: 'https://www.youtube.com/embed/2-kNs9vVgUo'
                },
                id: utilService.makeId(),
                color: ''
            },
            {
                type: 'noteTodo',
                isPinned: false,
                info: {
                    title: 'To do!',
                    todos: [
                        { txt: 'Kick ass', isDone: false, todoId: utilService.makeId() },
                        { txt: 'Chew gum', isDone: false, todoId: utilService.makeId() }
                    ]
                },
                id: utilService.makeId(),
                color: ''
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


function createTxtNote() {
    return {
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: 'New Note',
            txt: 'Double click to edit'
        },
        id: utilService.makeId(),
        color: ''
    }
}

function createImgNote() {
    return {
        type: 'noteImg',
        isPinned: false,
        info: {
            title: 'Edit to add Image!',
            url: '',
        },
        id: utilService.makeId(),
        color: ''
    }
}

function createTodoNote() {
    return {
        type: 'noteTodo',
        isPinned: false,
        info: {
            title: 'Add a Title!',
            todos: []
        },
        id: utilService.makeId(),
        color: ''
    }

}

function createVidNote() {
    return {
        type: 'noteVideo',
        isPinned: false,
        info: {
            title: 'Add a Title',
            url: 'https://www.youtube.com/embed/5qap5aO4i9A'
        },
        id: utilService.makeId(),
        color: ''
    }

}