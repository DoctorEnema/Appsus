export default {
    props: ['emails'],
    name: 'email-folders',
    template: `
    <section class="email-folders">
        <button class="inbox" :class="{'active-folder': activeFolder === 'inbox'}" @click="setActiveFolder('inbox')">
        Inbox <span v-if="unreadCount" class="unread-count"> ({{unreadCount}}) </span>
        </button>
        <button class="sent" :class="{'active-folder': activeFolder === 'sent'}" @click="setActiveFolder('sent')">Sent</button>
        <button class="all" :class="{'active-folder': activeFolder === 'all'}" @click="setActiveFolder('all')">All</button>
    </section>`,
    data() {
        return {
            activeFolder: 'inbox'
        }
    },
    methods: {
        setActiveFolder(folder) {
            this.$router.push(
                { path: `/email/${folder}/`}).catch(err => {
                });
            this.activeFolder = folder;
        }
    },
    computed: {
        unreadCount() {
            let unread = this.emails.filter(email => {
                return email.folder === 'inbox' && !email.isRead;
            });
            return unread.length;
        }
    }
}