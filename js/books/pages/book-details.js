import { bookService } from '../services/book-service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section v-if="book" class="book-details">
        <button class="close"><router-link :to="'/books'">X</router-link></button>
        <div class="book-details-main">
            <div class="image">
                <img :src="book.thumbnail">
                <div v-if="book.listPrice.isOnSale" class="sale"><span class="cancelled">{{afterSale}}</span> {{book.listPrice.amount}} SALE!</div>
            </div>
            <h2 class="emph">{{book.title}}</h2>
            <p>{{book.subtitle}}</p>
            <h4>By: <span class="emph">{{book.authors[0]}}</span></h4>
            <ul>
             Categories:
                <li class="emph" v-for="category in book.categories">
                 {{category}}
                </li>
            </ul>
            <p>Pages: {{book.pageCount}} - <span class="emph">{{readType}}</span></p>
            <p>Language: <span class="emph">{{book.language}}</span></p>
            <p>Published: {{book.publishedDate}}</p>
        </div>
        <div class="book-details-aux">
            <p>Description:{{book.description}}</p>
            <p>Price: {{book.listPrice.amount}}{{convertedCurrency}}</p>
            <p>ID:{{book.id}}</p>
            <p>Sale?{{book.listPrice.isOnSale}}</p>
        </div>
        <div v-if="isReviewed" class="review">
            <form @submit.prevent="saveReview">
            <div class="review-top">
                <h2>Leave a review!</h2>
            </div>
            <div class="full-name">
                <input v-model="book.review.reviewer" type="text"> Full Name
            </div>
            <div class="date-read">
                <input v-model="book.review.readAt" type="date"> Date read
            </div>
            <div class="rating">
                <input v-model="book.review.rating" :min="1" :max="5" type="range">{{this.book.review.rating}}
            </div>
            <div class="free-form">
                <textarea v-model="book.review.reviewTxt" name="review" cols="75" rows="15"></textarea>
            </div>
            <button class="submit-review">Submit Review!</button>
            </form>
        </div>
        <button v-if="!isReviewed" @click="writeReview()"></button>
    </section>
    `,
    data() {
        return {
            book: null,
            isReviewed: false,
        }
    },
    methods: {
        writeReview() {
            this.book.review = {
                reviewer: 'Books Reader',
                readAt: this.findNow,
                rating: 5,
                reviewTxt: null,
            }
            this.isReviewed = true
        },
        saveReview() {
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: 'Review Submitted!',
                        type: 'review-success'
                    }
                    eventBus.$emit('show-msg', msg)
                })
                .then(() => this.$router.push('/book'))
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'There was an Error!',
                        type: 'review-error'
                    }
                })
        },
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book)
            .then(() => {
                if (this.book.review) this.isReviewed = true
            })
            .catch(err => err)

    },
    computed: {
        convertedCurrency() {
            if (this.book.listPrice.currencyCode === 'EUR') return '€'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
        },
        readType() {
            if (this.book.pageCount <= 100) return 'Light reading'
            if (this.book.pageCount <= 500) return 'Decent reading'
            else return 'Long reading'
        },
        afterSale() {
            return this.book.listPrice.amount * 2
        },
        findNow() {
            const now = new Date()
            console.log(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
            return `${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate()}`
        }
    }
}