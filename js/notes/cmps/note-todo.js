import { utilService } from "../../services/util-service.js"
import todoItem from "./todo.js"
import { eventBus } from "../../services/event-bus-service.js"


export default {
    props: ['note'],
    components: {
        todoItem
    },
    template: `
        <section :style="{backgroundColor:note.color}">
            <input @blur="updateNote()" v-if="title.isBeingEdited" v-model="note.info.title" type="text" ref="noteTitle">
            <h2 @dblclick="editTitle()" v-else>{{note.info.title}}</h2>
            <div class="todos">
                <ul>
                    <li v-for="todoItem in note.info.todos" :key="todoItem.id">
                        <todo-item :note="note" :todoItem="todoItem" />
                    </li>
                </ul>
            </div>
            <textarea @blur="onAddTodo()" v-if="addingTodo" v-model="newTodo.txt" ref="noteTodo"></textarea>
            <button title="Save Note" class="save" v-if="addingTodo" @click="onAddTodo()"></button>
            <button title="Add Todo" class="add" v-else @click="addTodo()"></button>
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
                isBeingEdited: false,
            },
            addingTodo: false,
            newTodo: {
                txt: '',
                isDone: false,
                todoId: utilService.makeId()
            }
        }
    },
    methods: {
        addTodo(){
            this.addingTodo=true
            setTimeout(() => this.$refs.noteTodo.focus())
        },
        onAddTodo() {
            if(!this.newTodo.txt) console.log('Add Error');
            this.note.info.todos.push(this.newTodo)
            this.addingTodo = false
            this.newTodo = {
                txt: '',
                isDone: false,
                todoId: utilService.makeId()
            }
            eventBus.$emit('saveNote', this.note)
        },
        togglePinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.$emit('saveNote', this.note)
        },
        updateNote() {
            eventBus.$emit('saveNote', this.note)
            this.title.isBeingEdited = false
            this.addingTodo = false
        },
        removeNote() {
            eventBus.$emit('removeNote', this.note.id)
        },
        editTitle() {
            this.title.isBeingEdited = true
            setTimeout(() => this.$refs.noteTitle.focus())
        },
        editMode() {
            this.title.isBeingEdited = true
        },
    },
    computed: {
        editing() {
            return this.title.isBeingEdited
        }
    },
    created() {
        eventBus.$on('delete', todoId => {
            var todos = this.note.info.todos
            var toRemoveIdx = todos.findIndex(todo => todo.todoId === todoId)
            console.log(toRemoveIdx);
            todos.splice(toRemoveIdx, 1)
            eventBus.$emit('saveNote', this.note)
        })
    }

}