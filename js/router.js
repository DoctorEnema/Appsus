import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import notesApp from './notes/pages/notes-app.js';
import emailApp from './email/pages/email-app.js';
import emailFolders from './email/cmps/email-folders.js';
// import emailDetails from './email/pages/email-details.js';
import booksApp from './books/pages/book-app.js'
import searchBooks from './books/pages/search-books.js';
import bookDetails from './books/pages/book-details.js';

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
        path: '/email',
        component: emailApp
    },
    // {
    //     path: '/email/inbox',
    //     component: emailFolders,
    // },
    {
        path: '/books',
        component: booksApp
    },
    {
        path: '/books/search',
        component: searchBooks
    },
    {
        path: '/books/:bookId',
        component: bookDetails,
    },
]

export const router = new VueRouter({ routes });