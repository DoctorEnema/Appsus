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
    createImgNote,
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
                color:''
            },
            {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: 'ETON',
                    txt: 'wiwa'
                },
                id: utilService.makeId(),
                color:''
            },
            {
                type: 'noteImg',
                isPinned: true,
                info: {
                    title: 'IMAGE',
                    url: 'https://lolisc.co.il/wp-content/uploads/2019/04/3_Yuumi_W1.jpg'
                },
                id: utilService.makeId(),
                color:''
            },
            {
                type: 'noteVideo',
                isPinned: false,
                info: {
                    title: 'DaBest',
                    url: 'https://www.youtube.com/embed/2-kNs9vVgUo'
                },
                id: utilService.makeId(),
                color:''
            },
            {
                type: 'noteTodo',
                isPinned: false,
                info: {
                    title: 'To do!',
                    todos: [
                        { txt: 'Eat ass', isDone: false, todoId: utilService.makeId() },
                        { txt: 'Chew cum', isDone: false, todoId: utilService.makeId() }
                    ]
                },
                id: utilService.makeId(),
                color:''
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
            title: 'New Note',
            txt: 'Double click to edit'
        },
        id: utilService.makeId(),
    }
}

function createImgNote() {
    return {
        type: 'noteImg',
        info: {
            title: 'Edit to add Image!',
            url: '',
        },
        id: utilService.makeId()

    }
}