import emailFilter from '../cmps/email-filter.js'
import emailFolders from '../cmps/email-folders.js'
import emailCompose from '../cmps/email-compose.js'
import { emailService } from '../services/email-service.js'
import { eventBus } from '../../services/event-bus-service.js'
import emailList from '../cmps/email-list.js'

export default {
    name: 'email-app',
    template: `
    <section>
        <email-filter @filterSet="setFilter" @sortSet="setSort"/>
        <div class="email-container"> 
            <aside class="email-aside">
                <button class="compose" @click="isComposing = !isComposing">Compose</button>
                <email-folders :emails="emails"/>
            </aside>
            <router-view :to="'/email'" @replayEmailSet="setReplyEmail" @emailRead="markAsRead" :emails="emailsToDisplay"/>
        </div>
        <div v-if="isComposing">
            <email-compose @emailSaved="saveEmail" @composeClosed="closeCompose" :replayEmail="replayEmail" :note="note"/>
        </div>
        <!-- <email-list :emails="emailsToDisplay"></email-list> -->
    </section> `,
    data() {
        return {
            emails: [],
            filterBy: null,
            sortBy: null,
            isComposing: false,
            replayEmail: null,
            note: null
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                });
        },
        setFilter(filter) {
            this.filterBy = filter;
            console.log(filter.byContent);
        },
        setSort(sort) {
            this.sortBy = sort;
        },
        setReplyEmail(email) {
            this.replayEmail = email;
            this.isComposing = true;
        },
        closeCompose() {
            this.isComposing = false;
            this.replayEmail = null;
        },
        saveEmail() {
            this.isComposing = false;
            this.loadEmails();
        },
        deleteEmail(id) {
            emailService.remove(id)
                .then(() => {
                    if (this.$route.params.emailId) this.$router.push(`./`);
                    this.loadEmails();
                })
        },
        markAsRead(email) {
            email.isRead = true;
            emailService.update(email)
                .then(() => {
                    this.loadEmails();
                })
        },
        toggleRead(email) {
            email.isRead = !email.isRead;
            emailService.update(email)
                .then(() => {
                    this.loadEmails();
                })
        }
    },
    computed: {
        emailsToDisplay() {
            let emailsToDisplay = this.emails;

            if (this.filterBy) {
                if (this.filterBy.byContent)
                    emailsToDisplay = emailService.searchByContent(emailsToDisplay, this.filterBy.byContent);
                if (this.filterBy.byStatus)
                    emailsToDisplay = emailService.filterByStatus(emailsToDisplay, this.filterBy.byStatus);
            }

            if (this.sortBy) emailsToDisplay = emailService.sortBy(emailsToDisplay, this.sortBy)

            return emailsToDisplay;
        }
    },
    created() {
        this.loadEmails();

        eventBus.$on('emailEreased', this.deleteEmail);
        eventBus.$on('readToggled', this.toggleRead);

        // if (this.$route.query.note) {
        //     this.note = this.$route.query.note;
        //     this.isComposing = true;
        //     this.$router.push('/email/inbox')
        // }

    },
    components: {
        emailCompose,
        emailFilter,
        emailFolders,
        emailList
    }
}