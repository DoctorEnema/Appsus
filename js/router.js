import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import notesApp from './notes/pages/notes-app.js';
import emailApp from './email/pages/email-app.js';
import emailList from './email/cmps/email-list.js';
import emailDetails from './email/pages/email-details.js'
import booksApp from './books/pages/book-app.js'
import searchBooks from './books/pages/search-books.js';
import bookDetails from './books/pages/book-details.js';
import emailPreview from './email/cmps/email-preview.js';

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
        path: '/email/',
        component: emailApp,
        children: [
            {
                path: ':folder',
                component: emailList,
            },
            {
                path: '',
                component: emailList,
            },
            {
                path: 'sent',
                component: emailList
            },
            {
                path: 'inbox',
                component: emailList
            },
    {
        path: '/email/:folder/:emailId',
        component: emailDetails
    },
        ]
    },

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