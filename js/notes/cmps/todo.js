import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['todoItem', 'note'],
    template: `
    <section>
        <textarea v-if="isBeingEdited" v-model="todoItem.txt"></textarea>
        <h2 v-else @click="toggleTodo()" :class="{'done-todo':todoItem.isDone }" >{{todoItem.txt}}</h2>
        <button v-if="!isBeingEdited" @click="isBeingEdited=true">Edit</button>
        <button v-else @click="saveTodo()">Save</button>
        <button @click="deleteTodo()">DELETE</button>
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
        },
        deleteTodo(){
            eventBus.$emit('delete', this.todoItem.todoId)
        }
    },


}