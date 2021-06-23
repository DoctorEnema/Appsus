import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import notesApp from '../notes/pages/notes-app.js';
import emailApp from '../email/pages/email.js';

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
    }

]

export const router = new VueRouter({ routes });