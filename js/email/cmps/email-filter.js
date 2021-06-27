import { eventBus } from "../../services/event-bus-service.js"

export default {
    name: 'email-filter',
    template: `
    <section class="email-filters"> 
            <input class="email-search" @input="setFilter" type="text" placeholder="Search..." v-model="filterBy.byContent" >
            <div class="email-dropdowns">
                <select @change="setFilter" v-model="filterBy.byStatus">
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

                <select @change="setSort" v-model="sortBy">
                    <option value="date">Date</option>
                    <option value="name">Sender</option>
                </select>
            </div>
    </section>`,
    data() {
        return {
            filterBy: {
                byContent: '',
                byStatus: ''
            },
            sortBy: 'date'
        }
    },
    methods: {
        setFilter() {
            this.$emit('filterSet', this.filterBy)
        },
        setSort() {
            this.$emit('sortSet', this.sortBy)
        }
    }
}