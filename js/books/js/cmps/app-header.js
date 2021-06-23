export default {
    template: `
    <header class="books-header">
        <h3>Books</h3>
        <nav>
            <router-link :to="'/book'">Books</router-link>
            <router-link :to="'search'">Search</router-link>
        </nav>
    </header>
    `,
};
