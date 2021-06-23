export default {
    props: ['book'],
    template: `
    <div class="book-preview">
        <h2>{{book.title}}</h2>
        <h3>By {{book.authors[0]}}</h3>
        <p>Price: {{book.listPrice.amount}}{{convertedCurrency}}</p>

    </div>
    `,
    computed: {
        convertedCurrency() {
            if (this.book.listPrice.currencyCode === 'EUR') return '€'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
        }
    }
};
