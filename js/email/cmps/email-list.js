
import emailPreview from './email-preview.js'

export default {

    props: ['emails'],
    template: `
        <section class="email-list-section" >
            <ul class="email-list">
                <li  v-for="email in folderEmails" :key="email.id" :class="{read: email.isRead}" @click="readEmail(email, email.id)">
                    <email-preview :email="email"/>
                </li>
            </ul>
            <h4 v-if="!folderEmails.length">it feels empty... no emails here yet</h4>
        </section>
            `,
    computed: {
        folderEmails() {
            const folder = this.$route.params.folder;
            if (!folder || folder === 'all') return this.emails;

            let filteredEmails = this.emails;
            return filteredEmails.filter(email => email.folder === folder)
        }
    },
    methods: {
        readEmail(email, id) {
            this.$emit('emailRead', email)
            this.$router.push('/email/' + this.$route.params.folder + '/' + id)
            // this.$router.push(`/email/sent/${id}`)
        }
    },
    components: {
        emailPreview
    }
}