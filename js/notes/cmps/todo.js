import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['todoItem', 'note'],
    template: `
    <section class="todo">
        <div class="todo-text">
            <textarea @blur="saveTodo()" v-if="isBeingEdited" v-model="todoItem.txt" ref="todo"></textarea>
            <p v-else @click="toggleTodo()" :class="{'done-todo':todoItem.isDone }" >{{todoItem.txt}}</p>
        </div>
        <div class="todo-btns">
            <button title="Edit Todo" class="edit" v-if="!isBeingEdited" @click="editTodo()"></button>
            <button title="Save Todo" class="save" v-else @click="saveTodo()"></button>
            <button title="Remove Todo" class="remove" @click="deleteTodo()"></button>
        </div>
    </section>
    `,
    data() {
        return {
            isBeingEdited: false,
        }
    },
    computed: {

    },
    methods: {
        toggleTodo() {
            this.todoItem.isDone = !this.todoItem.isDone
            eventBus.$emit('saveNote', this.note)
        },
        toggleEditMode() {
            this.isBeingEdited = !this.isBeingEdited
        },
        saveTodo() {
            this.isBeingEdited = false
            eventBus.$emit('saveNote', this.note)
            eventBus.$emit('show-msg', { type: 'success', txt:'Saved!' })
        },
        deleteTodo() {
            eventBus.$emit('delete', this.todoItem.todoId)
            eventBus.$emit('show-msg', { type: 'success', txt:'Removed!' })
        },
        editTodo() {
            this.isBeingEdited = true
            setTimeout(() => this.$refs.todo.focus())
        }
    },


}