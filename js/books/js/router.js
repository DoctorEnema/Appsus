import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookDetails from './pages/book-details.js';
import searchBooks from './pages/search-books.js'

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
        path: '/search',
        component: searchBooks,
    },
    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/book/:bookId',
        component: bookDetails,
    },

]

export const router = new VueRouter({ routes });