import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import bookApp from './pages/book-app.js'
import userMsg from './cmps/user-msg.js';
import { router } from './router.js'
const options = {
    el: '#app',
    router,
    components: {
        userMsg,
        appHeader,
        appFooter
    },
    template: `
        <section class="main">
            <user-msg />
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `,
};

const app = new Vue(options);
