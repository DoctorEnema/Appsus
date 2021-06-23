import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import { router } from './router.js'

const options = {
    el: '#app',
    router,
    components: {
        // userMsg,
        appHeader,
        appFooter
    },
    template: `
        <section class="main">
            <!-- <user-msg /> -->
            <app-header />
            <router-view class="main-content" />
            <app-footer />
        </section>
    `,
};

const app = new Vue(options);
