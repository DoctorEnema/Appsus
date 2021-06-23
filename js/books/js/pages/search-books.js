import { bookService } from "../services/book-service.js";
import searchPreview from "../cmps/search-preview.js";

export default {
    components: {
        searchPreview,
    },
    template: `
    <section>
        <h2>Search</h2>
        <input type="search" v-model="text">
        <button @click="tryFetch()">Search?</button>
        <ul class="searchies">
            <li v-for="book in books">
                <search-preview :book="book" />
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            text: '',
            books: null,
        }
    },
    methods: {
        tryFetch() {
            bookService.fetchBooks(this.text)
                .then(books => {
                    this.books = books
                    // console.log('books', books[0]);
                })
                .catch(err => console.log(err))
        },
        
    }
}