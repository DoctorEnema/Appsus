export default{
    template: `
    <section>
        <label>Search:</label>
        <input v-model="filterBy.title" type="text" @input="filter" placeholder="Search...">
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: ''
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};

