export default{
    template: `
        <input class="note-search" v-model="filterBy.title" type="text" @input="filter" placeholder="Search...">
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

