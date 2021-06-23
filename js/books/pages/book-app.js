import { bookService } from '../services/book-service.js';
import { eventBus } from '../../services/event-bus-service.js'
import bookList from '../cmps/book-list.js'
import bookDetails from './book-details.js'

export default {
    components: {
        bookList,
        bookDetails
    },
    template: `
        <section class="book-app">
        <router-link :to="'/books'">Books</router-link>
            <router-link :to="'/books/search'">Search</router-link>
            <book-list :books="books" @selected="selectBook" v-if="!selectedBook"/>
            <book-details/>
            <button @click="tryFetch">TRY FETCH</button>
        </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
        }
    },
    created() {
        this.loadBooks();
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book
        },
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        testing() {
            const msg = 'hello'
            eventBus.$emit('show-msg', msg)
        },
        tryFetch() {
            bookService.fetchBooks('bugs')
                .then(books => {
                    console.log('books', books);
                })

        }
    },
    computed: {
    },
};
