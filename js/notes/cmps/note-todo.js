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
        <button @click="removeNote()">Remove</button>
            <div><h2>{{note.info.title}}</h2></div>
            <ul>
                <li v-for="todoItem in note.info.todos" :key="todoItem.id">
                    <todo-item :note="note" :todoItem="todoItem" />
                </li>
            </ul>
            <textarea v-if="addingTodo" v-model="newTodo.txt"></textarea>
            <button v-if="addingTodo" @click="onAddTodo()">Save Todo</button>
            <button v-else @click="addingTodo=true">Add New</button>
            <input v-model="note.color" type="color">
            <button @click="updateNote()">Update</button>
            <button @click="togglePinNote()">Pin</button>
        </section>
    `,
    data() {
        return {
            addingTodo: false,
            newTodo: {
                txt: '',
                isDone: false,
                todoId: utilService.makeId()
            }
        }
    },
    methods: {
        onAddTodo() {
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
        },
        removeNote() {
            eventBus.$emit('removeNote', this.note.id)
        },
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