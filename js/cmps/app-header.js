
export default {
    template: `
    <section class="all-header">
        <header class="main-content app-header">
            <div class="logo-all">
                <h3 class="logo">Cattus</h3>
                <div class="yuumi-head"></div>
            </div>
            <nav >
                <router-link :to="'/'">Home</router-link>
                <router-link :to="'/about'">About</router-link>
                <router-link :to="'/notes'">Notes</router-link>
                <router-link :to="'/email'">Email</router-link>
                <!-- <router-link :to="'/books'">Books</router-link> -->
            </nav>
        </header>
    </section>
    `,
};
