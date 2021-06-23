import { bookService } from "../services/book-service.js"

export default {
    props: ['book'],
    template: `
        <div class="searched-preview">
        <div class="searched-img">
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" :alt="book.volumeInfo.title">
            </div>
            <div class="searched-info">
                <h2>{{book.volumeInfo.title}}</h2>
                <p>By: <span v-for="(author, index) in book.volumeInfo.authors ">{{author}}<span v-if="index !== book.volumeInfo.authors.length -1">, </span></span></p>
                <p>Categories: <span v-for="(category, index) in book.volumeInfo.categories">{{category}}<span v-if="index !== book.volumeInfo.categories.length -1">, </span></span></p>
                <p>Page-count: {{book.volumeInfo.pageCount}}</p>
                <p>Published: {{book.volumeInfo.publishedDate}}</p>
                <p>Language: <span class="uppercase">{{book.volumeInfo.language}}</span></p>
            </div>
            <div>
                <button @click="addFav()">Add</button>
                Add to Fav {{isFav}}
            </div >
        </div>
    `,
    data() {
        return {
        }
    },
    computed: {
        // isFav() {
        //     bookService.query('books')
        //         .then(books => {
        //             return books.some(book => book.id === this.book.id)
        //         })
        // },
        isFav() {
            if (JSON.parse(localStorage.getItem('books')).some(book => book.id === this.book.id)) return true
        }
    },

    methods: {
        addFav() {
            if (JSON.parse(localStorage.getItem('books')).some(book => book.id === this.book.id)) {
                return
            }
            //weird bug, doesn't show until page refreshes
            bookService.addGoogleBook(this.book)
            // console.log(this.book);

        }
    }
}