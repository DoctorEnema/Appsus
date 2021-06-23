export default {
    template: `
    <header class="app-header">
        <h3>Books</h3>
        <nav>
            <router-link :to="'/'">Home</router-link>
            <router-link :to="'/about'">About</router-link>
            <router-link :to="'/notes'">Notes</router-link>
            <router-link :to="'/email'">Email</router-link>
            <!-- <router-link :to="'/notes'">Notes</router-link> -->
        </nav>
    </header>
    `,
};
