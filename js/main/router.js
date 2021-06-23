import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import notesApp from '../notes/pages/notes-app.js';
import emailApp from '../email/pages/email.js';
import booksApp from '../books/js/pages/book-app.js';
import searchBooks from '../books/js/pages/search-books.js';

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: aboutPage,
    },
    {
        path: '/notes',
        component: notesApp
    },
    {
        path: '/Email',
        component: emailApp
    },
    {
        path: '/books',
        component: booksApp
    }, {
        path: '/books/search',
        component: searchBooks
    }
]

export const router = new VueRouter({ routes });